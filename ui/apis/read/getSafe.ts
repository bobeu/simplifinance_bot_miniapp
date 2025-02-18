import { ViemClient } from "@/interfaces";
import { getContractData } from "../utils/getContractData";
import { readContract } from "viem/actions";
import { celoAlfajores } from "viem/chains";
import { getSafeAbi } from "../abis";

export default async function getSafe({ unit, client} : GetSafeParam) {
  return await readContract(client, {
    abi: getSafeAbi, 
    address: getContractData(client.chain?.id || celoAlfajores.id).factory, 
    functionName: "getSafe",
    args: [unit]
  });
}

export interface GetSafeParam {
  unit: bigint;
  client: ViemClient;
}
