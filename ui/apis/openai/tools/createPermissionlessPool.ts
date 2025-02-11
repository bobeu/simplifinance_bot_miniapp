import { getClients } from "@/apis/viemClient";
import { Address, ToolConfigProperties, TransactionCallback, WagmiConfig } from "@/interfaces";
import { parseEther } from "viem";
import { handleTransaction } from "@/utilities";

export const createPermissionlessPool = ({wagmiConfig, callback} : CreatePermissionLessArgs) : ToolConfigProperties<CreatePermissionLessPoolParams> => {
    const client = getClients().getPublicClient();

    return {
        definition: {
            type: 'function',
            function: {
                name: 'createPermissionlessPool',
                description: 'Set up a new permissionless liquidity pool for a specific amount. The unit contribution but not be in existence.',
                parameters: {
                    type: 'object',
                    properties: {
                        unitLiquidity: {
                            type: 'number',
                            description: `Amount provided by each participant as liquidity or contribution.`
                        },
                        collateralCoverageIndex: {
                            type: 'string',
                            description: `Collateral factor/coverage is usually determined by the operator of 
                                           FlexPool at the time of creation. This is the percentage of loan 
                                           that is secure by discounting the value of Celo`
                        },
                        quorum: {
                            type: 'number',
                            description: `The maximum mumber of users that can participate in a flexpool. Generally, the minimum number of participants in any FlexPool is 2 while the maximum is 255`
                        },
                        interestRate: {
                            type: 'string',
                            description: `The rate of interest to charge on each contributor that get finance. Select between 1 and 300. 1 = 0.01%`
                        },
                        duration: {
                            type: 'number',
                            description: `How long an user should utilize the borrowed fund before they can pay back`
                        },
                        
                    },
                    required: ['unit','target']
                }
            }
        },
        handler: async({unitLiquidity, interestRate, quorum, durationInHour, collateralCoverageIndex}) => {
           await handleTransaction({
                callback,
                otherParam: {
                    client,
                    wagmiConfig,
                    account: String(client.account) as Address,
                    txnType: 'CREATE',
                    unit: parseEther(unitLiquidity.toString()),
                },
                client,
                router: 'Permissionless',
                createPermissionlessPoolParam: {
                    account: String(client.account) as Address,
                    colCoverage: collateralCoverageIndex,
                    client,
                    quorum,
                    durationInHours: durationInHour,
                    intRate: interestRate,
                    unitLiquidity: parseEther(unitLiquidity.toString()),
                    wagmiConfig,
                    callback,
                }
                
            });
        }
    }
}

export interface CreatePermissionLessArgs {
    wagmiConfig: WagmiConfig;
    callback: TransactionCallback;
}

export interface CreatePermissionLessPoolParams {
    interestRate: number;
    quorum: number;
    durationInHour: number;
    collateralCoverageIndex: number;
    unitLiquidity: number;
}

