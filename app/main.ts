import { load } from '@std/dotenv';
import { txn } from './utils/eth.ts';

await load({
  // envPath: '/Users/abraj/dev/archive/learn-solidity/env/.env',
  envPath: '.env.local',
  export: true,
});

function main() {
  txn();
}

if (import.meta.main) {
  main();
}
