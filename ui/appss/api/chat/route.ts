
// import { openai } from '@ai-sdk/openai';
// import { streamText, tool } from 'ai';
// import { z } from 'zod';

// export const maxDuration = 30;

// export async function POST(req: Request) {
//   const { messages } = await req.json();

//   const result = streamText({
//     model: openai('gpt-4o'),
//     messages,
//     tools: {
//       weather: tool({
//         description: 'Get the weather in a location (fahrenheit)',
//         parameters: z.object({
//           location: z.string().describe('The location to get the weather for'),
//         }),
//         execute: async ({ location }) => {
//           const temperature = Math.round(Math.random() * (90 - 32) + 32);
//           return {
//             location,
//             temperature,
//           };
//         },
//       }),

//       convertFahrenheitToCelsius: tool({
//         description: 'Convert a temperature in fahrenheit to celsius',
//         parameters: z.object({
//           temperature: z
//             .number()
//             .describe('The temperature in fahrenheit to convert'),
//         }),
//         execute: async ({ temperature }) => {
//           const celsius = Math.round((temperature - 32) * (5 / 9));
//           return {
//             celsius,
//           };
//         },
//       }),
//     },
//   });

//   return result.toDataStreamResponse();
// }




import { openAIConfig } from '@/apis/openai/helperTool/client';
import { buildTools } from '@/apis/openai/tools';
import { Address, CommonToolArg, TransactionCallback } from '@/interfaces';
import { formatAddr, handleTransaction } from '@/utilities';
import { openai } from '@ai-sdk/openai';
import { streamText, tool } from 'ai';
import { useAccount, useConfig } from 'wagmi';
import { z } from 'zod';
import { getClients } from '@/apis/viemClient';
import { parseEther } from 'viem';
import { getKitWithPredictedSafe } from '@/apis/safe/getKitWithPredictedSafe';
import { randomBytes } from 'crypto';
import { THRESHOLD } from '@/constants';
import { deployPredictedSafe } from '@/apis/safe/deployPredictedSafe';

export const maxDuration = 30;

export async function POST(req: Request) {
  const { getPublicClient, getWalletClient } = getClients();
  const publicClient = getPublicClient();
  const walletClient = getWalletClient();

  const { messages } = await req.json();
  // const callback : TransactionCallback = (arg) => setmessage(arg.message);
  const callback : TransactionCallback = (arg) => null;
  const account = formatAddr(useAccount().address);
  const wagmiConfig = useConfig()

  const querySafe = async(): Promise<Address> => {
      const kit = await getKitWithPredictedSafe(
          {
            owners: [String(publicClient.account) as Address, account],
            threshold: THRESHOLD,
          },
          randomBytes(96).toString(),
          walletClient
            
      );
      return (await deployPredictedSafe(kit, walletClient)).safe as Address;
  }

  const result = streamText({
    model: openai(openAIConfig.model),
    messages,
    tools: {
      weather: tool({
          description: 'Get the weather in a location (fahrenheit)',
          parameters: z.object({
            unitLiquidity: z.string().describe("Amount provided by each participant as liquidity or contribution."),
            collateralCoverageIndex: z.string().describe("Collateral factor/coverage is usually determined by the operator of FlexPool at the time of creation. This is the percentage of loan that is secured by discounting the value of Celo."),
            quorum: z.string().describe("The maximum number of users that can participate in a flexpool. Generally, the minimum number of participants in any FlexPool is 2 while the maximum is 255."),
            interestRate: z.string().describe("The rate of interest to charge on each contributor that gets finance. Select between 1 and 300. 1 = 0.01%."),
            duration: z.string().describe("How long a user should utilize the borrowed fund before they can pay back."),
          }),
        execute: async ({ unitLiquidity, collateralCoverageIndex, quorum, interestRate, duration }) => {
          await handleTransaction({
              callback,
              otherParam: {
                  client: publicClient,
                  wagmiConfig,
                  account,
                  txnType: 'CREATE',
                  unit: parseEther(unitLiquidity),
              },
              client: walletClient,
              router: 'Permissionless',
              createPermissionlessPoolParam: {
                  account,
                  colCoverage: Number(collateralCoverageIndex),
                  client: walletClient,
                  quorum: Number(quorum),
                  durationInHours: Number(duration),
                  intRate: Number(interestRate),
                  unitLiquidity: parseEther(unitLiquidity),
                  wagmiConfig,
                  callback,
                  querySafe
              }
          });
        },
      }),
    },
  });
  
  return result.toDataStreamResponse();
}
