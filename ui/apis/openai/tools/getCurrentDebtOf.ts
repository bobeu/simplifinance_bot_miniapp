import getCurrentDebt  from "@/apis/read/getCurrentDebt";
import { getClients } from "@/apis/viemClient";
import { Address, ToolConfigProperties } from "@/interfaces";
import { parseEther } from "viem";

interface GetCurrentDebtArgs {
    unitLiquidity: string;
    target: Address;
}


export const getCurrentDebtOf = () : ToolConfigProperties<GetCurrentDebtArgs> => {
    const clients = getClients();

    return {
        definition: {
            "name": "getCurrentDebt",
            "description": "Get the current debt of a connected user in a given pool",
            "strict": true,
            "parameters": {
                "type": "object",
                "required": [
                    "target",
                    "unitLiquidity"
                ],
                "properties": {
                    "target": {
                    "type": "string",
                    "description": "The target address to get the current debt"
                    },
                    "unitLiquidity": {
                    "type": "string",
                    "description": "The contribution of the pool e.g 1 = $1, 5 = $5, e.t.c"
                    }
                },
                "additionalProperties": false
            },
            type: "function",
            function: {
                name: "getCurrentDebt",
                description: "Get the current debt of a connected user in a given pool",
                additionalProperties: false
            }
        },
        handler: async({unitLiquidity, target}) => {
            return await getCurrentDebt({
                account: target,
                unit: parseEther(unitLiquidity),
                client: clients.getPublicClient()
            }); 
        }
    }
}