## lib/12

### Start (off-chain) oracle nodes

```bash
# (off-chain) oracle nodes
deno run -A app/main.ts oracle-node1
deno run -A app/main.ts oracle-node2
```

### Submit request via on-chain client

```bash
# (off-chain) client
deno run -A app/main.ts client
```

### Submit request directly to (on-chain) oracle

```bash
# (off-chain) client
deno run -A app/main.ts
```

### Oracle Implementation

- https://medium.com/@pedrodc/implementing-a-blockchain-oracle-on-ethereum-cedc7e26b49e
- https://github.com/pedroduartecosta/blockchain-oracle/tree/master
