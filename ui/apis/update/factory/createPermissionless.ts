import type { Address, CreatePermissionLessPoolParams, TrxResult } from "@/interfaces";
import { getContractData } from "../../utils/getContractData";
import { simulateContract, writeContract } from "viem/actions";
import { waitForConfirmation } from "../../utils/waitForConfirmation";
import { createPermissionlessLiquidityPoolAbi } from "@/apis/abis";
import { errorMessage } from "../formatError";
import { celoAlfajores } from "viem/chains";
import { sendTransaction } from "wagmi/actions";
import { parseEther } from "viem";
import { PROPOSED_TRANSACTION_COST_PER_TOOL } from "@/constants";

export default async function createPermissionlessLiquidityPool(param: CreatePermissionLessPoolParams) {
  const { client, account, quorum, wagmiConfig, unitLiquidity, intRate, callback, durationInHours, colCoverage } = param;
  const { factory: address, token } = getContractData(client.chain?.id || celoAlfajores.id);
  let returnValue : TrxResult = 'reverted';
  const proposedEpochTrxCost = PROPOSED_TRANSACTION_COST_PER_TOOL * BigInt(quorum);
  
  const sent = await sendTransaction(wagmiConfig, {
    to: String(client.account) as Address,
    value: parseEther(proposedEpochTrxCost.toString())
  });

  if(sent){
    await simulateContract(client, {
      address,
      account,
      abi: createPermissionlessLiquidityPoolAbi,
      functionName: "createPermissionlessPool",
      args: [intRate, quorum, durationInHours, colCoverage, unitLiquidity, token],
    }).then(async({request}) => {
        callback?.({message: "Launching a Permissionless flexPool..."});
        const hash = await writeContract(client, request );
        returnValue = await waitForConfirmation({client, hash, callback: callback!});
      }).catch((error: any) => callback?.({message: errorMessage(error)}));
  }


  return returnValue;
}
