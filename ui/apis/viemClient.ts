import { sonicBlazeTestnet } from "@/components/AppProvider";
import { Address } from "@/interfaces";
import { createPublicClient, createWalletClient, http } from "viem";import { privateKeyToAccount } from "viem/accounts";
// import { celoAlfajores } from "viem/chains";

export function getClients() {
    return {
        getPublicClient: () => {
            return createPublicClient({
                chain: sonicBlazeTestnet,
                transport: http(`https://sonic-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`)
            })
        },
        getWalletClient: () => {
            if(!process.env.NEXT_PUBLIC_AGENT_KEY) throw new Error('Agent key not detected');
            const account = privateKeyToAccount(process.env.NEXT_PUBLIC_AGENT_KEY as Address);
            return createWalletClient({
                chain: sonicBlazeTestnet,
                account,
                transport: http(`https://sonic-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`)
            })
        },
        user: () => {
            const client = createPublicClient({
                chain: sonicBlazeTestnet,
                transport: http(window.ethereum)
            });
            return client.account;
        }
    }
}


