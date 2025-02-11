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
