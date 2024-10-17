// Sepolia
export const contractAddress = '0x05e46a991773C3aA4210Ee6DdcDbDB0955d59496';

export const contractAbi = [
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': true,
        'internalType': 'uint256',
        'name': 'id',
        'type': 'uint256',
      },
      {
        'indexed': false,
        'internalType': 'string',
        'name': 'urlToQuery',
        'type': 'string',
      },
      {
        'indexed': false,
        'internalType': 'string',
        'name': 'attributeToFetch',
        'type': 'string',
      },
    ],
    'name': 'NewRequest',
    'type': 'event',
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': true,
        'internalType': 'uint256',
        'name': 'id',
        'type': 'uint256',
      },
      {
        'indexed': false,
        'internalType': 'string',
        'name': 'urlToQuery',
        'type': 'string',
      },
      {
        'indexed': false,
        'internalType': 'string',
        'name': 'attributeToFetch',
        'type': 'string',
      },
      {
        'indexed': false,
        'internalType': 'string',
        'name': 'agreedValue',
        'type': 'string',
      },
    ],
    'name': 'ResultAvailable',
    'type': 'event',
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
    'name': 'createRequest',
    'outputs': [
      {
        'internalType': 'uint256',
        'name': '',
        'type': 'uint256',
      },
    ],
    'stateMutability': 'nonpayable',
    'type': 'function',
  },
  {
    'inputs': [],
    'name': 'currentId',
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
        'internalType': 'uint256',
        'name': '',
        'type': 'uint256',
      },
      {
        'internalType': 'uint256',
        'name': '',
        'type': 'uint256',
      },
    ],
    'name': 'requestAnswers',
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
  {
    'inputs': [
      {
        'internalType': 'uint256',
        'name': '',
        'type': 'uint256',
      },
      {
        'internalType': 'address',
        'name': '',
        'type': 'address',
      },
    ],
    'name': 'requestQuorum',
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
        'internalType': 'uint256',
        'name': '',
        'type': 'uint256',
      },
    ],
    'name': 'requests',
    'outputs': [
      {
        'internalType': 'uint256',
        'name': 'id',
        'type': 'uint256',
      },
      {
        'internalType': 'address',
        'name': 'requester',
        'type': 'address',
      },
      {
        'internalType': 'string',
        'name': 'urlToQuery',
        'type': 'string',
      },
      {
        'internalType': 'string',
        'name': 'attributeToFetch',
        'type': 'string',
      },
      {
        'internalType': 'string',
        'name': 'agreedValue',
        'type': 'string',
      },
    ],
    'stateMutability': 'view',
    'type': 'function',
  },
  {
    'inputs': [
      {
        'internalType': 'uint256',
        'name': '_id',
        'type': 'uint256',
      },
      {
        'internalType': 'string',
        'name': '_valueRetrieved',
        'type': 'string',
      },
    ],
    'name': 'updateRequest',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function',
  },
];
