import { Thread, ThreadCreateParams } from "openai/resources/beta/threads/threads.mjs";
import { client } from "./client";

export async function createThread(message: string) : Promise<Thread> {
    const tool_resources : ThreadCreateParams.ToolResources = {
       
    }
    const thread = await client.beta.threads.create({
        messages: [
            {
                role: 'user',
                content: message
            }
        ],
        tool_resources: 
    });
    return thread;
}