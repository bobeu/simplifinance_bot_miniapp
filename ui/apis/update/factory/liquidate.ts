import { Address, CommonParam, TrxResult } from "@/interfaces";
import { getContractData } from "../../utils/getContractData";
import { getBalance, simulateContract, writeContract } from "viem/actions";
import { waitForConfirmation } from "../../utils/waitForConfirmation";
import { liquidateAbi } from "@/apis/abis";
import { errorMessage } from "../formatError";
import { celoAlfajores } from "viem/chains";
import { toBN } from "@/utilities";
import { PROPOSED_TRANSACTION_COST_PER_TOOL } from "@/constants";
import { sendTransaction } from "wagmi/actions";
import { parseEther } from "viem";

export default async function liquidate(args: CommonParam) {
  const { client, callback,wagmiConfig, account, unit } = args;
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
    abi: liquidateAbi,
    functionName: "liquidate",
    args: [unit]
  }).then(async({request}) => {
    const hash = await writeContract(client, request );
    callback?.({message: "Sending liquidation request..."});
    returnValue = await waitForConfirmation({client, hash, callback: callback!});
  }).catch((error: any) => callback?.({message: errorMessage(error)}));
    
  return returnValue;
}

