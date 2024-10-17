// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.19;

import { IClient, IOracle } from "./interfaces.sol";

contract Client is IClient {
  IOracle oracle;
  uint256 public requestId;
  string public value;

  constructor() {
    oracle = IOracle(address(0x05e46a991773C3aA4210Ee6DdcDbDB0955d59496));
  }

  function submitRequest(string memory _urlToQuery, string memory _attributeToFetch) external {
    requestId = oracle.createRequest(_urlToQuery, _attributeToFetch);
  }

  function requestCallback(uint256 _requestId, string memory _valueRetrieved) external {
    if (requestId == _requestId) {
      value = _valueRetrieved;
    } else {
      value = "";
    }
  }
}
