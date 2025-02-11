import getCurrentDebt  from "@/apis/read/getCurrentDebt";
import { getClients } from "@/apis/viemClient";
import { Address, ToolConfigProperties } from "@/interfaces";

interface GetCurrentDebtArgs {
    unit: bigint;
}


export const getMyCurrentDebt = () : ToolConfigProperties<GetCurrentDebtArgs> => {
    const client = getClients().getPublicClient();

    return {
        definition: {
            type: 'function',
            function: {
                name: 'getCurrentDebt',
                description: 'Get the current debt of a contributor/borrower in a given pool',
                parameters: {
                    type: 'object',
                    properties: {
                        unit: {
                            type: 'bigint',
                            description: 'The contribution of the pool e.g 1 = $1, 5 = $5, e.t.c'
                        },
                        
                    },
                    required: ['unit','target']
                }
            }
        },
        handler: async({unit}) => {
            return await getCurrentDebt({
                account: String(client.account) as Address,
                unit,
                client: client
            }); 
        }
    }
}

// export const tools: Record<string, ToolConfigProperties> = {
    
// }
