import { CommonParam, TrxResult } from "@/interfaces";
import { getContractData } from "../../utils/getContractData";
import { simulateContract, readContract, writeContract } from "viem/actions";
import { waitForConfirmation } from "../../utils/waitForConfirmation";
import { getEllipsisTxt } from "@/components/AddressFormatter/stringFormatter";
import { addToPoolAbi, getAvailableSlotAbi } from "@/apis/abis";
import { formatEther } from "viem";
import { errorMessage } from "../formatError";
import { celoAlfajores } from "viem/chains";

export default async function addToPool(args: CommonParam) : Promise<string> {
  const { unit, client, callback, account } = args;
  const address = getContractData(client.chain?.id || celoAlfajores.id).factory;
  let returnValue = 'Transaction did not succeed';
  const isPoolVacant = await readContract(client, {
    address,
    account,
    abi: getAvailableSlotAbi,
    functionName: "isPoolVacant",
    args: [unit]
  });
  if(!isPoolVacant) return `This pool is currently filled up. You can check other available pools`;
  await simulateContract(client, {
    address,
    account,
    abi: addToPoolAbi,
    functionName: "addUserToPool",
    args: [unit, [account]]
  }).then(async({request}) => {
    callback?.({message: `Adding user ${getEllipsisTxt(account)} to pool at ${formatEther(unit)}`});
    const hash = await writeContract(client, request );
    returnValue = `Transaction ${await waitForConfirmation({client, hash, callback})}`;
  }).catch((error: any) => {
    callback?.({message: errorMessage(error)});
  });

  return returnValue;
}
