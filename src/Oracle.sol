// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.19;

contract Oracle {
  uint256 public currentId = 0; // increasing request id
  uint256 public minQuorum = 2; // minimum number of responses to receive before declaring final result
  uint256 public totalOracleCount = 3; // Hardcoded oracle count

  Request[] requests; // list of requests made to the contract
  mapping(uint256 => mapping(address => uint256)) public requestQuorum; // Separate mapping for quorum per request
  mapping(uint256 => mapping(uint256 => string)) public requestAnswers; // Separate mapping for answers per request

  // define a general api request
  struct Request {
    uint256 id; // request id
    string urlToQuery; // API url
    string attributeToFetch; // json attribute (key) to retrieve in the response
    string agreedValue; // value from key
  }

  // emitted to notify (off-chain) oracle (to process new request)
  event NewRequest(uint256 id, string urlToQuery, string attributeToFetch);

  // emitted to notify client contract (when there's a consensus on the final result)
  event ResultAvailable(uint256 id, string urlToQuery, string attributeToFetch, string agreedValue);

  function createRequest(string memory _urlToQuery, string memory _attributeToFetch) public {
    requests.push(Request(currentId, _urlToQuery, _attributeToFetch, ""));
    mapping(address => uint256) storage quorum = requestQuorum[currentId];

    // Hardcoded/Trusted (off-chain) oracle accounts/addresses
    quorum[address(0x8858eBF9a19bAf281624E571ef8309696D991Fde)] = 1;
    quorum[address(0x2ED69CD751722FC552bc8C521846d55f6BD8F090)] = 1;
    quorum[address(0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266)] = 1;

    // notify (off-chain) oracle (to process new request)
    emit NewRequest(currentId, _urlToQuery, _attributeToFetch);

    currentId++;
  }

  // called by (off-chain) oracle account to record its answer
  function updateRequest(uint256 _id, string memory _valueRetrieved) public {
    Request storage currRequest = requests[_id];
    mapping(address => uint256) storage quorum = requestQuorum[_id];
    mapping(uint256 => string) storage answers = requestAnswers[_id];

    // check if the (off-chain) oracle account/address is in the list of
    // trusted (off-chain) oracles, and if the oracle hasn't voted yet
    if (quorum[address(msg.sender)] == 1) {
      // marking that this address has voted
      quorum[msg.sender] = 2;

      // iterate through "array" of answers until a position if free and save the retrieved value
      uint256 idx = 0;
      bool found = false;
      while (!found) {
        if (bytes(answers[idx]).length == 0) {
          found = true;
          answers[idx] = _valueRetrieved;
        }
        idx++;
      }

      uint256 currentQuorum = 0;

      // iterate through trusted oracle list and check if enough oracles (minimum quorum)
      // have voted the same answer as the current one
      for (uint256 i = 0; i < totalOracleCount; i++) {
        bytes memory a = bytes(answers[i]);
        bytes memory b = bytes(_valueRetrieved);

        if (keccak256(a) == keccak256(b)) {
          currentQuorum++;
          if (currentQuorum >= minQuorum) {
            currRequest.agreedValue = _valueRetrieved;
            emit ResultAvailable(
              currRequest.id, currRequest.urlToQuery, currRequest.attributeToFetch, currRequest.agreedValue
            );
          }
        }
      }
    }
  }
}
