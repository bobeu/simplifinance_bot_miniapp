import { getClients } from "@/apis/viemClient";
import { Address, ToolConfigProperties, TransactionCallback, WagmiConfig } from "@/interfaces";
import { handleTransaction } from "@/utilities";
import { parseEther } from "viem";

export const payback = ({wagmiConfig, callback} : paybackArgs) : ToolConfigProperties<paybackParam> => {
    const client = getClients().getPublicClient();

    return {
        definition: {
            type: 'function',
            function: {
                name: 'payback',
                description: "Pay back the borrowed liquidity to the Safe so others can have access to it",
                parameters: {
                    type: 'object',
                    properties: {
                        unitLiquidity: {
                            type: 'number',
                            description: `Amount provided by each participant as liquidity or contribution.`
                        },
                    },
                    required: ['unitLiquidity']                                                
                }
            }
        },
        handler: async({unitLiquidity}) => {
            await handleTransaction({
                callback,
                otherParam: {
                    client,
                    wagmiConfig,
                    account: String(client.account) as Address,
                    txnType: 'GET FINANCE',
                    unit: parseEther(unitLiquidity.toString()),
                },
                client
            });
        }
    }
}

export interface paybackArgs {
    wagmiConfig: WagmiConfig;
    callback: TransactionCallback;
}

export interface paybackParam {
    unitLiquidity: number;
}

// export const tools: Record<string, ToolConfigProperties> = {
    
// }
