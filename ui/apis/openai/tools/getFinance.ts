import { getClients } from "@/apis/viemClient";
import { Address, ToolConfigProperties, TransactionCallback, WagmiConfig } from "@/interfaces";
import { handleTransaction } from "@/utilities";
import { parseEther } from "viem";

export const getFinance = ({wagmiConfig, callback} : GetFinanceArgs) : ToolConfigProperties<GetFinanceParam> => {
    const client = getClients().getPublicClient();

    return {
        definition: {
            type: 'function',
            function: {
                name: 'getFinance',
                description: "Utility for accessing the liquidity privilege of a pool. It is simply a tool to get finance. The contributor/borrower have enough collateral in native token e.g Celo in order to get finance. Please use the 'getCollateralQuote' tool to preview the collateral needed",
                parameters: {
                    type: 'object',
                    properties: {
                        unitLiquidity: {
                            type: 'number',
                            description: `Amount provided by each participant as liquidity or contribution.`
                        },
                        preferredDaysOfUse: {
                            type: 'number',
                            description: `The number of hours you wish to retain the loan/liquidity. This should not be greater than one set in the pool. It should be in the range 0 - 720hrs`
                        },
                    },
                    required: ['unitLiquidity']
                }
            }
        },
        handler: async({unitLiquidity, preferredDaysOfUse}) => {
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

export interface GetFinanceArgs {
    wagmiConfig: WagmiConfig;
    callback: TransactionCallback;
}

export interface GetFinanceParam {
    unitLiquidity: number;
    preferredDaysOfUse: number;
}

// export const tools: Record<string, ToolConfigProperties> = {
    
// }
