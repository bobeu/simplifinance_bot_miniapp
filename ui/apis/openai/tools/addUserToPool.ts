import { getClients } from "@/apis/viemClient";
import { Address, ToolConfigProperties, TransactionCallback, WagmiConfig } from "@/interfaces";
import { handleTransaction } from "@/utilities";
import { parseEther } from "viem";

export const addUserToPool = ({wagmiConfig, callback} : CreatePermissionLessArgs) : ToolConfigProperties<CreatePermissionLessPoolParams> => {
    const client = getClients().getPublicClient();

    return {
        definition: {
            type: 'function',
            function: {
                name: 'joinAPool',
                description: 'Become a contributor in a pool by joining the pool, and send your quota',
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
                    txnType: 'ADD LIQUIDITY',
                    unit: parseEther(unitLiquidity.toString()),
                },
                client
            });
        }
    }
}

export interface CreatePermissionLessArgs {
    wagmiConfig: WagmiConfig;
    callback: TransactionCallback;
}

export interface CreatePermissionLessPoolParams {
    unitLiquidity: number;
}

// export const tools: Record<string, ToolConfigProperties> = {
    
// }
