import getCurrentDebt  from "@/apis/read/getCurrentDebt";
import { getClients } from "@/apis/viemClient";
import { Address, ToolConfigProperties } from "@/interfaces";
import { parseEther } from "viem";

interface GetCurrentDebtArgs {
    unitLiquidity: string;
}

export const getMyCurrentDebt = () : ToolConfigProperties<GetCurrentDebtArgs> => {
    const client = getClients().getPublicClient();

    return {
        definition: {
            "name": "getCurrentDebt",
            "description": "Get the current debt of a contributor/borrower in a given pool",
            "strict": true,
            "parameters": {
                "type": "object",
                "required": [
                    "unitLiquidity"
                ],
                "properties": {
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
                description: "Get the current debt of a contributor/borrower in a given pool",
                additionalProperties: false
            }
        },
        handler: async({unitLiquidity}) => {
            return await getCurrentDebt({
                account: String(client.account) as Address,
                unit: parseEther(unitLiquidity),
                client: client
            }); 
        }
    }
}
