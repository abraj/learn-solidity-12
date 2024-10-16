import process from 'node:process';
import { ethers } from 'ethers';
import { getPrivateKey, getRpcUrl } from './eth-utils.ts';
import { abi, contractAddress } from '../const/eth-sepolia.ts';

function getContract(signed = false) {
  const chainId = 11155111; // Sepolia
  const address = process.env.WALLET_ADDRESS;

  const rpcUrl = getRpcUrl(chainId);
  if (!rpcUrl) {
    throw new Error('Invalid rpcUrl');
  }

  const privateKey = getPrivateKey(address);
  if (!privateKey) {
    throw new Error('Invalid privateKey');
  }

  const provider = new ethers.JsonRpcProvider(rpcUrl);

  let contract;
  if (signed) {
    const signer = new ethers.Wallet(privateKey, provider);
    contract = new ethers.Contract(contractAddress, abi, signer);
  } else {
    contract = new ethers.Contract(contractAddress, abi, provider);
  }

  return contract;
}

export async function txn() {
  try {
    const contract = getContract(true);

    if (!contract.interface.hasFunction('createRequest')) {
      throw new Error('Missing createRequest in ABI');
    }

    await contract.createRequest('foo', 'bar');
    console.log('txn submitted!');
  } catch (err) {
    console.error(err);
  }
}

export function listen() {
  try {
    const contract = getContract();

    contract.on('NewRequest', (reqId, url, attr) => {
      console.log(
        `[NewRequest event] reqId: ${reqId}, url: ${url}, attr: ${attr}; types: ${
          [reqId, url, attr].map((v) => typeof v)
        }`,
      );
    });

    console.log('listener setup!');
  } catch (err) {
    console.error(err);
  }
}
