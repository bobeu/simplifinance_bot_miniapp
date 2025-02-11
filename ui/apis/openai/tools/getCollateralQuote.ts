import getCollateralQuote  from "@/apis/read/getCollateralQuote";
import { getClients } from "@/apis/viemClient";
import { Address, ToolConfigProperties } from "@/interfaces";

export const get_CollateralQuote = () : ToolConfigProperties<GetCollateralQuoteArgs> => {
    const client = getClients().getPublicClient();
    return {
        definition: {
            type: 'function',
            function: {
                name: 'getCollateralQuote',
                description: 'Get the required amount of collateral (in native coin) a contributor will deposit to access the liquidity of a pool or getFinance',
                parameters: {
                    type: 'object',
                    properties: {
                        unit: {
                            type: 'bigint',
                            description: 'The unit contribution of the pool e.g 1 = $1, 5 = $5, 100 = $100 e.t.c'
                        },
                        
                    },
                    required: ['unit','target']
                }
            }
        },
        handler: async({unit}) => {
            return await getCollateralQuote({
                client,
                unit
            });
        }
    }
}

interface GetCollateralQuoteArgs {
    unit: bigint;
}
