import { ViemClient } from "@/interfaces";
import { getContractData } from "../utils/getContractData";
import { readContract } from "viem/actions";
import { celoAlfajores } from "viem/chains";
import { getCollateralQuoteAbi } from "../abis";

export default async function getCollateralQuote({ unit, client} : GetCollateralQuoteParam) {
  return await readContract(client, {
    abi: getCollateralQuoteAbi,
    address: getContractData(client.chain?.id || celoAlfajores.id).factory, 
    functionName: "getCollateralQuote",
    args: [unit]
  });
}

export interface GetCollateralQuoteParam {
  unit: bigint;
  client: ViemClient;
}
