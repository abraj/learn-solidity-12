import { load } from '@std/dotenv';
import { join } from '@std/path';
import { listen, txn } from './utils/eth.ts';

await load({
  // envPath: '/Users/abraj/dev/archive/learn-solidity/env/.env',
  envPath: join(import.meta.dirname!, '.env.local'),
  export: true,
});

function main() {
  listen();
  txn();
}

if (import.meta.main) {
  main();
}
