import { Address, CreatePermissionedPoolParams, TrxResult } from "@/interfaces";
import { getContractData } from "../../utils/getContractData";
import { simulateContract, writeContract } from "viem/actions";
import { waitForConfirmation } from "../../utils/waitForConfirmation";
import { createPermissionedLiquidityPoolAbi } from "@/apis/abis";
import { errorMessage } from "../formatError";
import { celoAlfajores } from "viem/chains";
import { PROPOSED_TRANSACTION_COST_PER_TOOL } from "@/constants";
import { sendTransaction } from "wagmi/actions";
import { parseEther } from "viem";

export default async function createPermissioned(param: CreatePermissionedPoolParams) {
  const { client, account, wagmiConfig, contributors, unitLiquidity, intRate, callback, durationInHours, colCoverage } = param;
  const { factory: address, token } = getContractData(client.chain?.id || celoAlfajores.id);
  let returnValue : TrxResult = 'reverted';
  const proposedEpochTrxCost = PROPOSED_TRANSACTION_COST_PER_TOOL * BigInt(contributors.length);
  
  const sent = await sendTransaction(wagmiConfig, {
    to: String(client.account) as Address,
    value: parseEther(proposedEpochTrxCost.toString())
  });

  if(sent){
    await simulateContract(client, {
      address,
      account,
      abi: createPermissionedLiquidityPoolAbi,
      functionName: "createPermissionedPool",
      args: [intRate, durationInHours, colCoverage, unitLiquidity, token, contributors],
    }).then(async({request}) => {
      callback?.({message: "Launching a permissioned flexPool..."});
      const hash = await writeContract(client, request );
      returnValue = await waitForConfirmation({client, hash, callback: callback!});
    }).catch((error: any) => callback?.({message: errorMessage(error)}));
  }
  
  return returnValue;
}
