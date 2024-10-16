import { load } from '@std/dotenv';

await load({
  envPath: '/Users/abraj/dev/archive/learn-solidity/env/.env',
  export: true,
});

function main() {
  console.log('>>', Deno.env.get('SEPOLIA_RPC_URL'));
}

if (import.meta.main) {
  main();
}
