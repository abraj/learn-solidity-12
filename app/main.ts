import { load } from '@std/dotenv';
import { join } from '@std/path';
import { createRequest, listen } from './utils/eth.ts';

await load({
  // envPath: '/Users/abraj/dev/archive/learn-solidity/env/.env',
  envPath: join(import.meta.dirname!, '.env.local'),
  export: true,
});

async function clientRequest() {
  const url = 'https://jsonplaceholder.typicode.com/users';
  const attr = '2';
  await createRequest(url, attr);
}

function main() {
  const args = Deno.args;
  const allowedNodeNames = ['oracle-node1', 'oracle-node2'];

  if (args.length === 0) {
    // client
    clientRequest();
  } else if (args.length === 1 && allowedNodeNames.includes(args[0])) {
    // (off-chain) oracle
    listen(args[0]);
  } else {
    console.log(`[ERROR] Invalid args: ${args}`);
  }
}

if (import.meta.main) {
  main();
}
