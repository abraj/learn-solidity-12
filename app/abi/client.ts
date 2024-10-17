// Sepolia
export const contractAddress = '0x9B6781760E19e60dA9C3E2814a302DE07e5d747A';

export const contractAbi = [
  {
    'inputs': [],
    'stateMutability': 'nonpayable',
    'type': 'constructor',
  },
  {
    'inputs': [
      {
        'internalType': 'uint256',
        'name': '_requestId',
        'type': 'uint256',
      },
      {
        'internalType': 'string',
        'name': '_valueRetrieved',
        'type': 'string',
      },
    ],
    'name': 'requestCallback',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function',
  },
  {
    'inputs': [],
    'name': 'requestId',
    'outputs': [
      {
        'internalType': 'uint256',
        'name': '',
        'type': 'uint256',
      },
    ],
    'stateMutability': 'view',
    'type': 'function',
  },
  {
    'inputs': [
      {
        'internalType': 'string',
        'name': '_urlToQuery',
        'type': 'string',
      },
      {
        'internalType': 'string',
        'name': '_attributeToFetch',
        'type': 'string',
      },
    ],
    'name': 'submitRequest',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function',
  },
  {
    'inputs': [],
    'name': 'value',
    'outputs': [
      {
        'internalType': 'string',
        'name': '',
        'type': 'string',
      },
    ],
    'stateMutability': 'view',
    'type': 'function',
  },
];
