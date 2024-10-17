import process from 'node:process';
import { ethers } from 'ethers';
import { getPrivateKey, getRpcUrl } from './eth-utils.ts';
import {
  contractAbi as oracleAbi,
  contractAddress as oracleAddress,
} from '../abi/oracle.ts';
import { queryApi } from '../oracle.ts';
import type { ContractTransactionResponse } from 'ethers';

function getContract(
  addr: string,
  abi: object[],
  signed = false,
  nodeName: string | null = null,
) {
  const chainId = 11155111; // Sepolia

  const rpcUrl = getRpcUrl(chainId);
  if (!rpcUrl) {
    throw new Error('Invalid rpcUrl');
  }

  const provider = new ethers.JsonRpcProvider(rpcUrl);

  let signer = null;
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

    signer = new ethers.Wallet(privateKey, provider);
    contract = new ethers.Contract(addr, abi, signer);
  } else {
    contract = new ethers.Contract(addr, abi, provider);
  }

  return { contract, signer, provider };
}

function getOracleContract(signed = false, nodeName: string | null = null) {
  return getContract(oracleAddress, oracleAbi, signed, nodeName);
}

export async function createRequest(url: string, attr: string) {
  try {
    const { contract } = getOracleContract(true);

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
    const { contract } = getOracleContract();

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
    const { contract, provider } = getOracleContract(true, nodeName);

    if (!contract.interface.hasFunction('updateRequest')) {
      throw new Error('Missing updateRequest in ABI');
    }

    const gasEstimate = await provider.estimateGas({
      to: contract.getAddress(),
      data: contract.interface.encodeFunctionData('updateRequest', [
        reqId,
        value,
      ]),
    });
    const txnResp: ContractTransactionResponse = await contract.updateRequest(
      reqId,
      value,
      { gasLimit: gasEstimate * 5n },
    );
    console.log('txn submitted: updateRequest');
    /* const txnReceipt = */ await txnResp.wait();
    // console.log(txnReceipt);
  } catch (err) {
    console.error(err);
  }
}

export function listen2() {
  try {
    const { contract } = getOracleContract();

    contract.once('ResultAvailable', (reqId, url, attr, value) => {
      const types = [reqId, url, attr, value].map((v) => typeof v);
      console.log(
        `[ResultAvailable event] reqId: ${reqId} (${types[0]}), url: (${
          types[1]
        }), attr: (${types[2]}), value: ${value}`,
      );
    });

    console.log('listener setup!');
  } catch (err) {
    console.error(err);
  }
}
