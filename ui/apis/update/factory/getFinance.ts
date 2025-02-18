import { Address, GetFinanceParam, TrxResult } from "@/interfaces";
import { getContractData } from "../../utils/getContractData";
import { simulateContract, writeContract } from "viem/actions";
import { waitForConfirmation } from "../../utils/waitForConfirmation";
import { getFinanceAbi } from "@/apis/abis";
import { errorMessage } from "../formatError";
import { celoAlfajores } from "viem/chains";
import { getBalance } from "viem/actions";
import { PROPOSED_TRANSACTION_COST_PER_TOOL } from "@/constants";
import { toBN } from "@/utilities";
import { sendTransaction } from "wagmi/actions";
import { parseEther } from "viem";

export default async function getFinance(args: GetFinanceParam ) {
  const { unit, wagmiConfig, client, callback, account, } = args;
  const address = getContractData(client.chain?.id || celoAlfajores.id).factory;
  let returnValue : TrxResult = 'success'; 
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
    abi: getFinanceAbi,
    functionName: "getFinance",
    args: [unit, account],
  }).then(async({request}) => {
    const hash = await writeContract(client, request );
    callback?.({message: "Creating get-Finance request..."});
        returnValue = await waitForConfirmation({client, hash, callback: callback!});
      }).catch((error: any) => {
        returnValue = 'reverted';
        callback?.({message: errorMessage(error)});
      });
  
    return returnValue;
}

