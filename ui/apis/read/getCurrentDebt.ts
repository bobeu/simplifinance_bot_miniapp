import { Address, ViemClient } from "@/interfaces";
import { getContractData } from "../utils/getContractData";
import { readContract } from "viem/actions";
import { getCurrentDebtAbi } from "../abis";
import { celoAlfajores } from "viem/chains";

export default async function getCurrentDebt(args: {client: ViemClient, unit: bigint, account: Address}) {
  const { client, unit, account } = args;
  return await readContract(client, {
    abi: getCurrentDebtAbi,
    address: getContractData(client.chain?.id || celoAlfajores.id).factory, 
    functionName: "getCurrentDebt",
    args: [unit, account]
  });
}

