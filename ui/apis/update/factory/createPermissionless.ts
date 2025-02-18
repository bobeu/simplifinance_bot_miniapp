import type { Address, CreatePermissionLessPoolParams, TrxResult } from "@/interfaces";
import { getContractData } from "../../utils/getContractData";
import { simulateContract, writeContract } from "viem/actions";
import { waitForConfirmation } from "../../utils/waitForConfirmation";
import { createPermissionlessLiquidityPoolAbi } from "@/apis/abis";
import { errorMessage } from "../formatError";
import { celoAlfajores } from "viem/chains";
import { sendTransaction } from "wagmi/actions";
import { parseEther, zeroAddress } from "viem";
import { PROPOSED_TRANSACTION_COST_PER_TOOL } from "@/constants";
import getSafe from "@/apis/read/getSafe";

export default async function createPermissionlessLiquidityPool(param: CreatePermissionLessPoolParams) {
  const { client, account, querySafe, quorum, wagmiConfig, unitLiquidity, intRate, callback, durationInHours, colCoverage } = param;
  const { factory: address,} = getContractData(client.chain?.id || celoAlfajores.id);
  let returnValue : TrxResult = 'reverted';
  const proposedEpochTrxCost = PROPOSED_TRANSACTION_COST_PER_TOOL * BigInt(quorum);
  let safe = (await getSafe({client, unit: unitLiquidity})).id;
  console.log("durationInHours", durationInHours)
    // console.log("client.account", client.account?.address)
  // setTimeout(() => callback?.({message: `New safe address was deployed to ${safe}`}), 4000);
  const sent = await sendTransaction(wagmiConfig, {
    to: String(client?.account?.address) as Address,
    // value: BigInt(0)
    value: BigInt(proposedEpochTrxCost.toString())
  });
  
  if(safe === zeroAddress) safe = await querySafe();
  callback?.({message: `New safe address was deployed to successfully`})
  // console.log("Safe2", safe);

  if(sent){
    await simulateContract(client, {
      address,
      account,
      abi: createPermissionlessLiquidityPoolAbi,
      functionName: "createPermissionlessPool",
      args: [safe, [account], unitLiquidity, quorum, intRate, durationInHours, colCoverage],
    }).then(async({request}) => {
        callback?.({message: "Launching a Permissionless flexPool"});
        const hash = await writeContract(client, request );
        returnValue = await waitForConfirmation({client, hash, callback: callback!});
        callback?.({message: `FlexPool was successfully created`});
      }).catch((error: any) => callback?.({message: errorMessage(error)}));
  }
  // setTimeout(() => callback?.({message: `FlexPool was successfully created`}), 2000);
  return returnValue;
}
