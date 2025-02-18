import React from "react";
import { MotionDivWrap } from "./MotionDivWrap";
import Container from "@mui/material/Container";
import createAssistant from "@/apis/openai/createAssistance";
import { CustomButton } from "./CustomButton";
import performRun from "@/apis/openai/performRun";
import { useAccount, useConfig } from "wagmi";
import { CommonToolArg, TransactionCallback } from "@/interfaces";
import { formatAddr } from "@/utilities";
import Message from "./features/FlexPool/update/DrawerWrapper/Message";
import useAppStorage from "./StateContextProvider/useAppStorage";

export default function App() {
    const [message, setInput] = React.useState<string>("");

    // const [sideMessage, setSideMessage] = React.useState<string>("");
    
    const { message: sideMessage, setmessage } = useAppStorage();
    const callback : TransactionCallback = (arg) => setmessage(arg.message);
    const toolArg : CommonToolArg = {
        account: formatAddr(useAccount().address),
        wagmiConfig: useConfig(),
        callback
    }
    
    const handleOnChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setInput(e.currentTarget.value);
    }

    const handleSubmit = async() => {
        try {
            setTimeout(() => setmessage('Using create_permissionless tool, ceating a new permissionless liquidity pool with $2'), 3000);
            clearTimeout(3000);
            // if(message === '') {
            //     return setmessage("Please type a message in the box to interact with SimpliFAi assistance");
            // }
            // const assistantId = (await createAssistant(toolArg)).id;
            const assistantId = "asst_ErdMmXZxInHA3v39eRvTpYEM";
            await performRun({assistantId, message, toolArg});
        } catch (error: any) {
            console.log("Error", error);
            const errorMessage = error?.message || error;
            if(errorMessage === "Connection error.") setmessage('Please check your inernet');
            else setmessage(errorMessage);
        }
    };

    React.useEffect(() => {
        setTimeout(() => setmessage(''), 50000);
        clearTimeout(20000);
    }, [sideMessage]);

    return(
        <MotionDivWrap className={`minHeight md:rounded-[56px] px-4 py-6 md:py-10 bg-transparent relative`} >
            <Container maxWidth="sm" className='absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] bg-gray1 p-10 rounded-[36px] '>
                <div className="grid grid-cols-1 space-y-4">
                    <div className="border-4 border-green1 w-full min-h-[300px] p-4 bg-green1 text-white1 rounded-[26px] ">
                        <Message />
                    </div>
                    <div className="border- border-green1 rounded-[26px] space-y-4">
                        <form onSubmit={handleSubmit}>
                            <input 
                                type="text"
                                placeholder="Ask Me Anything About Simplifinance"
                                className="w-full p-4 bg-green1 placeholder:text-orange-200 rounded-[16px]"
                                onChange={handleOnChange}
                            />
                        </form>
                        {
                            message !== '' && <CustomButton 
                                disabled={false}
                                handleButtonClick={handleSubmit}
                                overrideClassName="text-orange-300 font-bold border-2 p-4 border-green1 "
                            >
                                Submit
                            </CustomButton>
                        }
                    </div>
                </div>
            </Container>
        </MotionDivWrap>
    )
}
// Error encountered! Tool failed to run with error: Execution reverted for an unknown reason. Raw Call Arguments: from: 0xF1450c7F1CADE2Ff5Ec70e2Ffb191107352F4720 to: 0xb28721f7b977D64F9401161EA91bC25D59F25308 data: 0x83d0f8d20000000000000000000000000000000000000000000000001bc16d674ec80000 Contract Call: address: 0xb28721f7b977D64F9401161EA91bC25D59F25308 function: getSafe(uint256 unit) args: (2000000000000000000) Docs: https://viem.sh/docs/contract/readContract Details: execution reverted Version: 2.20.0