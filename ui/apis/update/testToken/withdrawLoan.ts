import { Address, Config } from "@/interfaces";
import { writeContract, simulateContract } from "viem/actions";
import { waitForConfirmation } from "../../utils/waitForConfirmation";
import { getContractData  } from "../../utils/getContractData";
import getAllowance from "./getAllowance";
import BigNumber from "bignumber.js";
import { formatEther } from "viem";
import { transferFromAbi } from "@/apis/abis";
import { errorMessage } from "../formatError";
import { celoAlfajores } from "viem/chains";

export default async function withdrawLoan(args: TransferFromParam) {
  const { callback, client, account: spender, bank: owner} = args;
  const {token: address} = getContractData(client.chain?.id || celoAlfajores.id);
  const allowance = await getAllowance({client, account: spender, spender, owner });
  if(new BigNumber(allowance.toString()).gt(0)) {
    await simulateContract(client, {
      address,
      account: spender,
      abi: transferFromAbi,
      functionName: 'transferFrom', 
      args: [owner, spender, allowance]
    })
    .then(async({request}) => {
      callback?.({message: `Approving and withdrawal $${formatEther(allowance)} loan to wallet...`});
      const hash = await writeContract(client, request );
      await waitForConfirmation({client, hash, callback: callback!});
    }).catch((error: any) => callback?.({message: errorMessage(error)}));
            
  } else {
    callback?.({message: `${allowance} allowance found`});
  }
}

export interface TransferFromParam extends Config {
  bank: Address;
}
