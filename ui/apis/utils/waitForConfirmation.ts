import { CONFIRMATIONS } from "@/constants";
import { Address, TransactionCallback, ViemClient } from "@/interfaces";
import { waitForTransactionReceipt } from "viem/actions";

export const waitForConfirmation = async(
    arg: {
        client: ViemClient, 
        hash: Address, 
        callback?: TransactionCallback
    }) => {
    const { client, hash, callback } = arg;
    const wait = await waitForTransactionReceipt(client, { hash, confirmations: CONFIRMATIONS})
    callback?.({
        message: `${wait?.status.toString().toUpperCase()} : Hash ${wait?.transactionHash.substring(0, 6)}... ${wait.transactionHash.substring(28, wait?.transactionHash.length)}`, 
    });
    return wait.status;
}
