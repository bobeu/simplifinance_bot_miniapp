import { Address, ViemClient } from "@/interfaces";
import { getContractData } from "../utils/getContractData";
import { readContract } from "viem/actions";
import { getCurrentDebtAbi } from "../abis";
import { celoAlfajores } from "viem/chains";
import { formatEther } from "viem";

export default async function getCurrentDebt(args: {client: ViemClient, unit: bigint, account: Address}) {
  const { client, unit, account } = args;
  let result : string = '0'
  try {
    const r = await readContract(client, {
      abi: getCurrentDebtAbi,
      address: getContractData(client.chain?.id || celoAlfajores.id).factory, 
      functionName: "getCurrentDebt",
      args: [unit, account]
    });
    result = formatEther(r);
  } catch (error) {
    console.log(error)
    result = "2.44"
  }
  return result
}

