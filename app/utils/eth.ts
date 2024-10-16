import process from 'node:process';
import { ethers } from 'ethers';
import { getPrivateKey, getRpcUrl } from './eth-utils.ts';
import { abi, contractAddress } from '../const/eth-sepolia.ts';

export async function txn() {
  const chainId = 11155111; // Sepolia
  const address = process.env.WALLET_ADDRESS;

  try {
    const rpcUrl = getRpcUrl(chainId);
    if (!rpcUrl) {
      throw new Error('Invalid rpcUrl');
    }

    const privateKey = getPrivateKey(address);
    if (!privateKey) {
      throw new Error('Invalid privateKey');
    }

    const provider = new ethers.JsonRpcProvider(rpcUrl);
    const signer = new ethers.Wallet(privateKey, provider);
    const contract = new ethers.Contract(contractAddress, abi, signer);

    if (!contract.interface.hasFunction('createRequest')) {
      throw new Error('Missing createRequest in ABI');
    }

    const resp = await contract.createRequest('foo', 'bar');
    console.log('resp:', resp);
  } catch (err) {
    console.error(err);
  }
}
