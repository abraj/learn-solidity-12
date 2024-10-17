## lib/12

### Start (off-chain) oracle nodes

```bash
deno run -A app/main.ts oracle-node1
deno run -A app/main.ts oracle-node2
```

### Submit new request to (on-chain) oracle

```bash
# client
deno run -A app/main.ts
```

### Oracle Implementation

- https://medium.com/@pedrodc/implementing-a-blockchain-oracle-on-ethereum-cedc7e26b49e
