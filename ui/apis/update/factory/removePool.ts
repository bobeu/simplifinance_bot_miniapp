import { Address, CommonParam, TrxResult } from "@/interfaces";
import { getContractData } from "../../utils/getContractData";
import { getBalance, simulateContract, writeContract } from "viem/actions";
import { waitForConfirmation } from "../../utils/waitForConfirmation";
import { removeLiquidityPoolAbi } from "@/apis/abis";
import { formatEther, parseEther } from "viem";
import { errorMessage } from "../formatError";
import { celoAlfajores } from "viem/chains";
import { PROPOSED_TRANSACTION_COST_PER_TOOL } from "@/constants";
import { toBN } from "@/utilities";
import { sendTransaction } from "wagmi/actions";

export default async function removePool(args: CommonParam) {
  const { client, callback, wagmiConfig, account, unit } = args;
  const address = getContractData(client.chain?.id || celoAlfajores.id).factory;
  let returnValue : TrxResult = 'reverted'; 
  const agentBalance = await getBalance(client, {address: String(client.account) as Address});
  if(toBN(agentBalance.toString()).lt(toBN(PROPOSED_TRANSACTION_COST_PER_TOOL.toString()))){
    await sendTransaction(wagmiConfig, {
      to: String(client.account) as Address,
      value: parseEther(PROPOSED_TRANSACTION_COST_PER_TOOL.toString())
    });
  }

  await simulateContract(client, {
    address,
    account,
    abi: removeLiquidityPoolAbi,
    functionName: "removeLiquidityPool",
    args: [unit]
  }).then(async({request}) => {
    const hash = await writeContract(client, request );
    callback?.({message: `Removing Flexpool at ${formatEther(unit)}`});
    returnValue = await waitForConfirmation({client, hash, callback: callback!});
  }).catch((error: any) => callback?.({message: errorMessage(error)}));
        
  return returnValue;
}

