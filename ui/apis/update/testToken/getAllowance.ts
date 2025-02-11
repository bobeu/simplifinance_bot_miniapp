import { Address, ViemClient } from "@/interfaces";
import { readContract } from "viem/actions";
import { getContractData } from "../../utils/getContractData";
import { allowanceAbi } from "@/apis/abis";
import { celoAlfajores } from "viem/chains";

export default async function getAllowance(args: {owner: Address, account: Address, spender: Address, client: ViemClient}) {
  const { owner, spender, account, client } = args;
  return await readContract(client, {
    address: getContractData(client.chain?.id || celoAlfajores.id).token,
    abi: allowanceAbi,
    functionName: "allowance",
    account,
    args: [owner, spender]
  });
}
