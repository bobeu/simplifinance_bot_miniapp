import { MessageContent } from "openai/resources/beta/threads/messages";
import createRun from "./createRun"
import handleRunToolCalls from "./handleRunToolCall";

export default async function performRun({assistantId, message} : PerformRunProp) {
    let { run, client, thread } = await createRun({assistantId, message})
    let errorMessage = '';
    let returnObj : MessageContent = {
        type: 'text',
        text: {
            value: 'No response from assistant',
            annotations: []
        }
    };
    // If the run requires any function call, then we can to make use of the tool
    while (run.status === 'requires_action') {
        run = await handleRunToolCalls(run, client, thread);
    }

    switch (run.status) {
        case 'failed':
            errorMessage = `Oops! I encountered an error: ${run.last_error?.message || 'Error unknown'}`;
            console.log("Run failed: ", run.last_error);
            
            // Return error message to user in the same thread
            await client.beta.threads.messages.create(thread.id, {
                role: 'assistant',
                content: errorMessage
            });
            returnObj.text.value = errorMessage;
            break;
    
        default:
            break;

        }

    const messages = await client.beta.threads.messages.list(thread.id);
    const messagesFromAssistant = messages.data.find(message => message.role === 'assistant');
    return messagesFromAssistant?.content[0] || returnObj;
}

interface PerformRunProp {
    message: string;
    assistantId: string;
}