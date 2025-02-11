import { getClients } from "@/apis/viemClient";
import { Address, ToolConfigProperties, TransactionCallback, WagmiConfig } from "@/interfaces";
import { parseEther } from "viem";
import { handleTransaction } from "@/utilities";

export const createPermissionedPool = ({wagmiConfig, callback} : CreatePermissionLessArgs) : ToolConfigProperties<CreatePermissionLessPoolParams> => {
    const client = getClients().getPublicClient();

    return {
        definition: {
            type: 'function',
            function: {
                name: 'createPermissionedPool',
                description: 'Get the current debt of a contributor/borrower in a given pool',
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
                        contributors: {
                            type: 'string[]',
                            description: `A list of your friends/family/users that are allowed to participate in this pool. Max is 255, and minimum of 2 persons.`
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
        handler: async({unitLiquidity, interestRate, contributors, durationInHour, collateralCoverageIndex}) => {
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
                router: 'Permissioned',
                createPermissionedPoolParam: {
                    account: String(client.account) as Address,
                    colCoverage: collateralCoverageIndex,
                    client,
                    contributors,
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
    contributors: Address[];
}

// export const tools: Record<string, ToolConfigProperties> = {
    
// }
