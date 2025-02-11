import getCurrentDebt  from "@/apis/read/getCurrentDebt";
import { getClients } from "@/apis/viemClient";
import { Address, ToolConfigProperties } from "@/interfaces";

interface GetCurrentDebtArgs {
    unit: bigint;
    target: Address;
}


export const getCurrentDebtOf = () : ToolConfigProperties<GetCurrentDebtArgs> => {
    const clients = getClients();

    return {
        definition: {
            type: 'function',
            function: {
                name: 'getCurrentDebt',
                description: 'Get the current debt of a connected user in a given pool',
                parameters: {
                    type: 'object',
                    properties: {
                        target: {
                            type: 'string',
                            pattern: '^0x[a-fA-F0-9]{40}$',
                            description: 'The target address to get the current debt'
                        },
                        unit: {
                            type: 'bigint',
                            description: 'The contribution of the pool e.g 1 = $1, 5 = $5, e.t.c'
                        },
                        
                    },
                    required: ['unit','target']
                }
            }
        },
        handler: async({unit, target}) => {
            return await getCurrentDebt({
                account: target,
                unit,
                client: clients.getPublicClient()
            }); 
        }
    }
}

// export const tools: Record<string, ToolConfigProperties> = {
    
// }
