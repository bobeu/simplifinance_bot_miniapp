import { CommonParam, TrxResult } from "@/interfaces";
import { getContractData } from "../../utils/getContractData";
import { simulateContract, writeContract } from "viem/actions";
import { waitForConfirmation } from "../../utils/waitForConfirmation";
import { getEllipsisTxt } from "@/components/AddressFormatter/stringFormatter";
import { addToPoolAbi } from "@/apis/abis";
import { formatEther } from "viem";
import { errorMessage } from "../formatError";
import { celoAlfajores } from "viem/chains";

export default async function addToPool(args: CommonParam) : Promise<TrxResult> {
  const { unit, client, callback, account } = args;
  const address = getContractData(client.chain?.id || celoAlfajores.id).factory;
  let returnValue : TrxResult = 'reverted';
  await simulateContract(client, {
    address,
    account,
    abi: addToPoolAbi,
    functionName: "joinAPool",
    args: [unit]
  }).then(async({request}) => {
    callback?.({message: `Adding user ${getEllipsisTxt(account)} to pool at ${formatEther(unit)}`});
    const hash = await writeContract(client, request );
    returnValue = await waitForConfirmation({client, hash, callback})
  }).catch((error: any) => {
    callback?.({message: errorMessage(error)});
  });

  return returnValue;
}
