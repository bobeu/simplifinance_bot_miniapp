import { CONFIRMATIONS, SAFE_VERSION } from "@/constants";
import { Address, ViemClient, WagmiConfig } from "@/interfaces";
import Safe, { getSafeAddressFromDeploymentTx } from "@safe-global/protocol-kit";
import { CLIENT_RENEG_WINDOW } from "node:tls";
import { sendTransaction, waitForTransactionReceipt } from "viem/actions";

/**
 * Deploy a new Safe from a predicted address, initialize a new kit and return { safe, owners, and threshold }
 * @param kit : SafeProtocol kit
 * @param config : Wagmi config
 * @returns : Three variables - { safe address, safe owners, threshold}
 */
export const deployPredictedSafe = async(kit: Safe, client: ViemClient, ) => {
    const deploymentTrx = await kit.createSafeDeploymentTransaction();
    const hash = await sendTransaction(client, {
        data: deploymentTrx.data as Address,
        to: deploymentTrx.to as Address,
        value: BigInt(deploymentTrx.value),
        account: client.account as unknown as Address,
        chain: client.chain
    });
    const trxReceipt = await waitForTransactionReceipt(client, {hash, confirmations: CONFIRMATIONS});
    const newKit = await kit.connect({safeAddress: getSafeAddressFromDeploymentTx(trxReceipt, SAFE_VERSION)});
    const safe = await newKit.getAddress();
    const owners = await newKit.getOwners();
    const threshold = await newKit.getThreshold();
    
    console.log("Safe address", safe);
    return{ safe, owners, threshold }
}
