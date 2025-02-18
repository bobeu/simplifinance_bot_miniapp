import { Config,} from "@/interfaces";
import { writeContract, simulateContract } from "wagmi/actions";
import { waitForConfirmation } from "../../utils/waitForConfirmation";
import { getContractData } from "../../utils/getContractData";
import { errorMessage } from "../formatError";
import { celoAlfajores } from "viem/chains";

export default async function approve(args: ApproveParam) {
  const { callback, client, account, wagmiConfig, amountToApprove } = args;
  const { token: address, factory } = getContractData(client.chain?.id || celoAlfajores.id);
  // console  
  // await simulateContract(wagmiConfig, {
  //     address,
  //     account,
  //     abi: approveAbi,
  //     functionName: "approve", 
  //     args: [factory, amountToApprove]
  //   })
  //   .then(async({request}) => {
  //       callback?.({message: "Approving spending limit..."});
  //       const hash = await writeContract(wagmiConfig, request );
  //       await waitForConfirmation({client, hash, callback: callback!});
  // }).catch((error: any) => callback?.({message: errorMessage(error)}));       
}

export const approveAbi = [
    {
        "inputs": [
          {
            "internalType": "address",
            "name": "spender",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "approve",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
] as const;

export interface ApproveParam extends Config {
  amountToApprove: bigint;
  // buttonText: ButtonContent; 
}
