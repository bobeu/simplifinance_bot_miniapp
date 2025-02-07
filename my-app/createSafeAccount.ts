// import Safe from '@safe-global/protocol-kit';

// const SIGNER_ADDRESS = '';
// const SIGNER_PRIVATE_KEY = '';
// const RPC_URL = 'https://rpc.ankr.com/eth_sepolia'

// const safeClient = await Safe.init({
//   provider: RPC_URL,
//   signer: SIGNER_PRIVATE_KEY,
//   safeOptions: {
//     owners: [SIGNER_ADDRESS],
//     threshold: 1
//   }
// });

// Or

// import Safe from '@safe-global/protocol-kit'

// const AGENT_ADDRESS = // ...
// const AGENT_PRIVATE_KEY = // ...
// const HUMAN_SIGNER_1_ADDRESS = // ...
// const HUMAN_SIGNER_2_ADDRESS = // ...
// const RPC_URL = 'https://rpc.ankr.com/eth_sepolia'

// const newSafe = await Safe.init({
//   provider: RPC_URL,
//   signer: AGENT_PRIVATE_KEY,
//   safeOptions: {
//     owners: [AGENT_ADDRESS, HUMAN_SIGNER_1_ADDRESS, HUMAN_SIGNER_2_ADDRESS],
//     threshold: 2
//   }
// })


// Create a pool with quorum
// Create a smart account with a signer threshold of quorum
// Create agents for all { quorum }
// One smart account is used instead of several banks. So no need to create a bank on the smart contract.
    // This reduces deployment and interaction cost.
// Each contributor sends their quota to a smart account.
// On getting finance, each contributor sends a signing request to S-Alc. And on completion of the signatures, funds are transfered to the next person.
    // Note: Factory SC will have a way to query the balances of S-Alc and keep proper record.
// On payback, same process is applicable.