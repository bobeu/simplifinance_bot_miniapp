import { Address, ViemClient } from "@/interfaces";
import { readContract } from "viem/actions";
import { getContractData } from "../../utils/getContractData";
import { balanceOfAbi, symbolAbi } from "@/apis/abis";
import { celoAlfajores } from "viem/chains";

export default async function getTestTokenBalance(args: GetBalanceArg) {
  const { account, client, target } = args;
  const { token: address } = getContractData(client.chain?.id || celoAlfajores.id);
  const name = await readContract(client, {
    address,
    abi: symbolAbi,
    functionName: "symbol",
    account,
    args: []
  });
  const balances = await readContract(client, {
    address,
    abi: balanceOfAbi,
    functionName: "balanceOf",
    account,
    args: [target]
  });
  return {
    name,
    balances
  }
}

export interface GetBalanceArg {
  target: Address;
  account: Address;
  client: ViemClient;
}

