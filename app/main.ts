import { load } from '@std/dotenv';
import { join } from '@std/path';
import { createRequest, listen, listen2, submitRequest } from './utils/eth.ts';

await load({
  // envPath: '/Users/abraj/dev/archive/learn-solidity/env/.env',
  envPath: join(import.meta.dirname!, '.env.local'),
  export: true,
});

function main() {
  const args = Deno.args;
  const allowedNodeNames = ['oracle-node1', 'oracle-node2'];

  const url = 'https://jsonplaceholder.typicode.com/users/2';
  const attr = 'name';

  if (args.length === 0) {
    // [client] submit request directly to (on-chain) oracle
    listen2();
    createRequest(url, attr);
  } else if (args.length === 1 && args[0] === 'client') {
    // [client] submit request via on-chain client
    submitRequest(url, attr);
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
