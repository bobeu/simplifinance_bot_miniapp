import { client, openAIConfig as cf } from "./client";
import { tools } from "./tools";

export default async function createAssistant() {
    return await client.beta.assistants.create({
        model: cf.model,
        name: 'Simplifi Agent',
        description: "",
        instructions: `
            Welcome to Simplifinance! A platform for short-term peer-to-peer financing where everything about liquidity is controlled by the users.
            From the setup to the final stage of the process, you're in control.

            The following tools are available for you to interact with the protocol through the AI assitance.
            - getCurrentDebt : Get the current debt of an address participating in a Flexpool. You will need to explicitly provide the target address (provided the target address is a contribitor) and the unit of that pool e.g if the unit of the pool is $5, simply type 5.
            - getMyCurrentDebt : Get your own debt balance of a pool provided you're a contributor in that pool.
        `,
        tools: Object.values(tools).map(tool => tool.definition),
    });
}