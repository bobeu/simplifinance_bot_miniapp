import { client } from "./client";
import { createThread } from "./createThread";

export default async function createRun(param: CreateRunParam) {
    const { assistantId, message } = param;
    const thread = await createThread(message);
    let run = await client.beta.threads.runs.create(thread.id, {
        assistant_id: assistantId
    });

    while (run.status === "in_progress" || run.status === 'queued') {
        await new Promise(resolve => setTimeout(resolve, 1000));
        run = await client.beta.threads.runs.retrieve(thread.id, run.id);
    }
    return { run, client, thread, assistantId };
}

interface CreateRunParam {
    assistantId: string;
    message: string;
}