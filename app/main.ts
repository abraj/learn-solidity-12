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
  if (args.length === 0) {
    // client
    clientRequest();
  } else if (args.length === 1 && args[0] === 'oracle') {
    // (off-chain) oracle
    listen();
  } else {
    console.log(`[ERROR] Invalid args: ${args}`);
  }
}

if (import.meta.main) {
  main();
}
