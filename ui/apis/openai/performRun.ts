import { MessageContent } from "openai/resources/beta/threads/messages";
import createRun from "./createRun"
import handleRunToolCalls from "./helperTool/handleRunToolCall";
import { getClients } from "@/apis/viemClient";
import { Address, CommonToolArg, ToolConfigProperties } from "@/interfaces";
import { parseEther } from "viem";
import { handleTransaction } from "@/utilities";
import { deployPredictedSafe } from "@/apis/safe/deployPredictedSafe";
import { getKitWithPredictedSafe } from "@/apis/safe/getKitWithPredictedSafe";
import { THRESHOLD } from "@/constants";
import { randomBytes } from "crypto";

export default async function performRun({assistantId, message, toolArg} : PerformRunProp) {
    const { callback,wagmiConfig, account } = toolArg;
    // setTimeout(() => ), 4000);
    callback({message: 'Run started, I will try to get a safe wallet for this pool otherwise I will create a new one'})
    const client = getClients();
    const publicClient = client.getPublicClient();
    const walletClient = client.getWalletClient();
    const owners = Array.from([walletClient.account.address, account]);
    const querySafe = async(): Promise<Address> => {
        // setTimeout(() => callback({message: `I can't find any safe address for this pool. Hold on while I create a new safe`}), 4000);
        // const kit = await getKitWithPredictedSafe(
        //     {
        //         owners,
        //         threshold: THRESHOLD,
        //     },
        //     // randomBytes(96).toString(),
        //     '0x1',
        //     walletClient
                
        // );
        // const safe = (await deployPredictedSafe(kit, client.getWalletClient())).safe as Address;
        // console.log("Safeee", safe);
        return '0xD7c271d20c9E323336bFC843AEb8deC23B346352';
    }
    const unitLiquidity = '2';
    const colCoverage = 150;
    const quorum = 2;
    const durationInHours = 22;
    const intRate = 1;
    
    await handleTransaction({
                    callback,
                    otherParam: {
                        client: walletClient,
                        wagmiConfig,
                        account,
                        txnType: 'CREATE',
                        unit: parseEther(unitLiquidity),
                    },
                    client: walletClient,
                    router: 'Permissionless',
                    createPermissionlessPoolParam: {
                        account,
                        colCoverage,
                        client: walletClient,
                        quorum,
                        durationInHours,
                        intRate,
                        unitLiquidity: parseEther(unitLiquidity),
                        wagmiConfig,
                        callback,
                        querySafe
                    }
                }).catch((error: any) => {
                    console.log("`Error encountered! Tool failed to run with error: ${error?.message || error?.data?.message || error}`}", `Error encountered! Tool failed to run with error: ${error?.message || error?.data?.message || error}`);
                    callback({message: `Error encountered! Tool failed to run with error: ${error?.message || error?.data?.message || error}`});
                })

    // let { run, client, thread } = await createRun({assistantId, message})
    // console.log("Run success");
    
    // let errorMessage = '';
    // let returnObj : MessageContent = {
    //     type: 'text',
    //     text: {
    //         value: 'No response from assistant',
    //         annotations: []
    //     }
    // };
    // If the run requires any function call, then we can to make use of the tool
    // while (run.status === 'requires_action' && run.required_action?.type === 'submit_tool_outputs') {
    //     console.log("Yes action");
    //     run = await handleRunToolCalls(run, client, thread, toolArg);
    // }
    // console.log("No action");

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
            // Return error message to user in the same thread
            await client.beta.threads.messages.create(thread.id, {
                role: 'assistant',
                content: "I can't find anything"
            });
           
            break;

    }

    console.log("Run here");
    console.log("Run end");
    const messages = await client.beta.threads.messages.list(thread.id);
    const messagesFromAssistant = messages.data.find(message => message.role === 'assistant');
    return messagesFromAssistant?.content[0] || returnObj;
}

interface PerformRunProp {
    message: string;
    assistantId: string;
    toolArg: CommonToolArg
}