import contract_Sonic from "../../deployments/blaze/Simplifi.json";
import contract_Celo from "../../deployments/alfajores/Simplifi.json";
import token_s from "../../deployments/blaze/TestUSD.json";
import token_celo from "../../deployments/alfajores/TestUSD.json";
import { Address } from "@/interfaces";

const indexes = [44787, 57054];
const currencies = ['CELO','S'];
const networks = ['ALFAJORES', 'BLAZE'];
const pairs = ["USDT/CELO", 'USDT/S'];
const contract_addrs = [token_celo.address, token_s.address] as const;
const factories = [contract_Celo.address, contract_Sonic.address] as const;

export const formatAddr = (x: string | (Address | undefined)) : Address => {
    if(!x || x === "") return `0x${'0'.repeat(40)}`;
    return `0x${x.substring(2, 42)}`;
};

export const getContractData = (chainId: number) => {
    const isInList = indexes.includes(chainId);
    if(!isInList) throw new Error('Unsupported chain');
    const index = indexes.indexOf(chainId);
    return {
        token: formatAddr(contract_addrs[index]),
        factory: formatAddr(factories[index]),
        currency: currencies[index],
        network: networks[index],
        pair: pairs[index],
    };
}
