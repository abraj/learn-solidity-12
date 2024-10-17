import process from 'node:process';
import { ethers } from 'ethers';
import { getPrivateKey, getRpcUrl } from './eth-utils.ts';
import { abi, contractAddress } from '../const/eth-sepolia.ts';
import { queryApi } from '../oracle.ts';

function getContract(signed = false, nodeName: string | null = null) {
  const chainId = 11155111; // Sepolia

  const rpcUrl = getRpcUrl(chainId);
  if (!rpcUrl) {
    throw new Error('Invalid rpcUrl');
  }

  const provider = new ethers.JsonRpcProvider(rpcUrl);

  let contract;
  if (signed) {
    let address = process.env.WALLET_ADDRESS; // 'oracle-node1'
    if (nodeName === 'oracle-node2') {
      address = process.env.WALLET_ADDRESS2;
    }

    const privateKey = getPrivateKey(address);
    if (!privateKey) {
      throw new Error('Invalid privateKey');
    }

    const signer = new ethers.Wallet(privateKey, provider);
    contract = new ethers.Contract(contractAddress, abi, signer);
  } else {
    contract = new ethers.Contract(contractAddress, abi, provider);
  }

  return contract;
}

export async function createRequest(url: string, attr: string) {
  try {
    const contract = getContract(true);

    if (!contract.interface.hasFunction('createRequest')) {
      throw new Error('Missing createRequest in ABI');
    }

    await contract.createRequest(url, attr);
    console.log('txn submitted: createRequest');
  } catch (err) {
    console.error(err);
  }
}

export function listen(nodeName: string) {
  try {
    const contract = getContract();

    contract.on('NewRequest', async (reqId, url, attr) => {
      const types = [reqId, url, attr].map((v) => typeof v);
      console.log(
        `[NewRequest event] reqId: ${reqId} (${types[0]}), url: (${
          types[1]
        }), attr: (${types[2]})`,
      );
      const value = await queryApi(url, attr);
      await updateRequest(nodeName, reqId, value);
    });

    console.log('listener setup!');
  } catch (err) {
    console.error(err);
  }
}

export async function updateRequest(
  nodeName: string,
  reqId: bigint,
  value: string,
) {
  try {
    const contract = getContract(true, nodeName);

    if (!contract.interface.hasFunction('updateRequest')) {
      throw new Error('Missing updateRequest in ABI');
    }

    await contract.updateRequest(reqId, value);
    console.log('txn submitted: updateRequest');
  } catch (err) {
    console.error(err);
  }
}
