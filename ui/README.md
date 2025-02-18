This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

<!-- Pay4Me coming soon... -->
<!-- "viem": "2.10.5", -->
<!-- PxCCxYGyRZmogFNMD4byaq5z-OYeLEL8   apikey
a5e40120-e164-4ea0-af53-25bb3a2b4b38 gaspolicy Id -->
<!-- https://crossfi-testnet.g.alchemy.com/v2/gy921BCbc7DSi3AEkGezAXkNB5RgpTbL -->
<!-- https://crossfi-mainnet.g.alchemy.com/v2/gy921BCbc7DSi3AEkGezAXkNB5RgpTbL -->

<!-- websocket -->
<!-- wss://crossfi-mainnet.g.alchemy.com/v2/gy921BCbc7DSi3AEkGezAXkNB5RgpTbL -->
<!-- wss://crossfi-testnet.g.alchemy.com/v2/gy921BCbc7DSi3AEkGezAXkNB5RgpTbL -->

<!-- Creating a pool costs around 0.0528 Celo eq to $0.03 on Celo blockchain -->

<!-- yarn add brahma-console-kit -->




// Prompt: "Create pool of $2".
//   To create a pool, 
//     Agent queries the smart contract for available safe mapped to a unit.
//     - If no safe found, 
//       * Initialize to create a safe for a pool.
//         - Make the contributors owners of the safe including the agent and 2 more accounts in case any issue arise to be abale to refund a contributor through a DAO proposal.
//         - Set the threshold to be 2. Either of the contributors can sign, while the agent execute it. So a user cannot trick the agent to sign a withdrawal transaction since agent knows only one source of truth which is the smart contract.
//         - Prompt the admin/user to send cycle fee to agent (1 Celo).
//         - Prompt the admin/user to deposit USDT asset to the safe.
//         - Agent calls the SC 
//             * SC stores the safe as (mapping of uint256 to address)
//             * SC stores the hashes of all the contributors.
//                - This is to reuse it next time in case the same set of contributors operate in similar.
//                - SC confirms the balance in safe correlates with the unit. 
//     - Else:
//       - Return error message to user that a pool was already created.
//       - Close the thread.

// Prompt: "Add me to pool $5".
//   - Agent checks with SC if the pool for $5 has a vacancy.
//     - If true,returns a message in same thread and prompts the user to fund the safe.
//       - If success, calls the SC to add user to the pool.
//         * SC correlates the balances with expected currentPool. If Ok, else reverts.
//     - Else return errorMessage and ask user to check other pools or create a new one.
//     - Soon as the last person joins, Agent prompts the user that they will sign a withdrawal transaction for a beneficiary that will be displayed to them in the chat.
//       User permission is not required. Just a notification.
//     - Agent proposes a withdrawal transaction with the benericiary address returned by the smart contract.
//     - Agent makes the user as owner signs the transaction.

// Prompts: "I want to get finance".
//   - Agent ensures the connected account has enough collateral balances in Celo to deposit to the safe. In this case, anyone can deposit collateral on behalf of another the expected user And prompts the transaction.
//   - Agent checks with SC if its ok to get finance and sign the release fund transaction. It does not matter who calls, the transaction will go through the smart contract since the right beneficiary was initially set on the safe.
//     * SC checks the necessary conditions, set the flag in state.
//     * Agent queries the state.
//     * Agent signs the transaction and fund is sent to the beneficiary if the condition is true.

// Prompts: "I want to pay back".
//   - Agent queries the SC for the right user address and amount of debt to pay. In this case, anyone can repay debt on behalf of another.
//   - Agent prompts the user to approve the SC with the amount of debt.
//   - Agent calls the SC.
//     SC withdraws the approval to the safe, set the state, and returns the required collateral balances to refund to the beneficiary.
//   - Agent checks with SC if ok to sign transaction.
//   - Agent proposes collateral release transaction.
//   - If transaction succeed, Agent prompts connected user to release collateral from the safe the beneficiary.

// prompts: "I want to liquididate the defaulter".
//   - Agent calls SC if any defaulter.
//     If false, agent returns error message.
//     If true, Agent calls payback on SC with connected user alc.
//      - SC replaces current user with defaulter and state updated.
//      - Agent queries SC for the state.
//      - Agent proposes collateral release transaction.
//      - If transaction succeed, Agent prompts connected user to release collateral from the safe the beneficiary.



