import { Thread } from "openai/resources/beta/threads/threads.mjs";
import { client } from "./client";


export async function createThread(message: string) : Promise<Thread> {
    const thread = await client.beta.threads.create();
    await client.beta.threads.messages.create(
        thread.id, 
        {
            role: 'user',
            content: message
        }
    );
    return thread;
}