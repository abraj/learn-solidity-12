// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.19;

interface IOracle {
  function createRequest(string memory _urlToQuery, string memory _attributeToFetch) external returns (uint256);
  function updateRequest(uint256 _requestId, string memory _valueRetrieved) external;
}

interface IClient {
  function submitRequest(string memory _urlToQuery, string memory _attributeToFetch) external;
  function requestCallback(uint256 _requestId, string memory _valueRetrieved) external;
}
