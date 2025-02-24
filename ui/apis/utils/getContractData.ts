import contract_Celo from "../../deployments/alfajores/Simplifi.json";
import token_celo from "../../deployments/alfajores/TestUSD.json";
import { Address } from "@/interfaces";

const currencies = ['CELO'];
const networks = ['ALFAJORES'];
const pairs = ["USDT/CELO"];
const contract_addrs = [token_celo.address] as const;
const factories = [contract_Celo.address] as const;

export const formatAddr = (x: string | (Address | undefined)) : Address => {
    if(!x || x === "") return `0x${'0'.repeat(40)}`;
    return `0x${x.substring(2, 42)}`;
};

export const getContractData = (chainId: number) => {
    return {
        token: formatAddr(contract_addrs[0]),
        factory: formatAddr(factories[0]),
        currency: currencies[0],
        network: networks[0],
        pair: pairs[0],
    };
}
