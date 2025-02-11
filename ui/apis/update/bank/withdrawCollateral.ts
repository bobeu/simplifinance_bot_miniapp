import type { DepositCollateralParam, TrxResult } from "@/interfaces";
import { simulateContract, writeContract } from "viem/actions";
import { waitForConfirmation } from "../../utils/waitForConfirmation";
import { withdrawCollateralAbi } from "@/apis/abis";
import { zeroAddress } from "viem";
import assert from "assert";
import { errorMessage } from "../formatError";

export default async function withdrawCollateral(args: DepositCollateralParam ) {
  const { client, callback, account, bank, rId  } = args;
  assert(bank !== zeroAddress, "Bank address is undefined");
  let returnValue : TrxResult = 'reverted';  
  await simulateContract(client, {
    address: bank,
    account,
    abi: withdrawCollateralAbi,
    functionName: 'withdrawCollateral',
    args: [rId],
  }).then(async({request}) => {
    callback?.({message: `Withdrawing collateral from the bank`});
      const hash = await writeContract(client, request );
      returnValue = await waitForConfirmation({client, hash, callback: callback!});
  }).catch((error: any) => callback?.({message: errorMessage(error)}));
        
  return returnValue;
}

