
// export default function Chat() {
  //   const { messages, input, handleInputChange, handleSubmit } = useChat({
    //     maxSteps: 5,
    //   });
    
    
    // }
    
"use client"

import React from "react";
import { useChat } from '@ai-sdk/react';
import OnbaordScreen from "@/components/OnboardScreen";
import { Path, TrxState, } from "@/interfaces";
import { StorageContextProvider } from "@/components/StateContextProvider";
import { useAccount, useReadContracts,} from "wagmi";
import getReadFunctions from "@/components/features/FlexPool/update/DrawerWrapper/readContractConfig";
import App from "@/components/App";
import Layout from "@/components/Layout";

export default function Index() {
  const [displayAppScreen, setDisplay] = React.useState<boolean>(false);
  const [openPopUp, setPopUp] = React.useState<number>(0);
  const [showSidebar, setShowSidebar] = React.useState(false);
  const [message, setMessage] = React.useState<string>('');
  const [displayOnboardUser, setDisplayOnboardUser] = React.useState<boolean>(false);
  const [activePath, setActivePath] = React.useState<Path>('/dashboard');
  const [displayForm, setDisplayForm] = React.useState<boolean>(false);
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    maxSteps: 5,
  });
  
  const { isConnected, address, connector, isDisconnected, chainId } = useAccount();
  const { getFactoryDataConfig, readSymbolConfig } = getReadFunctions({chainId});
  
  const { data, refetch } = useReadContracts({
    contracts: [
      {...readSymbolConfig()},
      {...getFactoryDataConfig()}
    ],
    allowFailure: true,
    query: {
      refetchInterval: 4000, 
      refetchOnReconnect: 'always', 
    }
  });
  
  const closeDisplayForm = () => setDisplayForm(false);
  const openDisplayForm = () => setDisplayForm(true);
  const toggleDisplayOnboardUser = () => setDisplayOnboardUser(!displayOnboardUser);
  const exitOnboardScreen = () => setDisplay(true);
  const togglePopUp = (arg: number) => setPopUp(arg);
  const setmessage = (arg: string) => setMessage(arg);
  const toggleSidebar = (arg: boolean) => setShowSidebar(arg);
  const setActivepath = (arg:Path) => setActivePath(arg);
  const setstorage = (arg: TrxState) => {
    if(arg.message) setMessage(arg.message);
    refetch();
  };

  const displayScreen = () => {
    const children = (
      <Layout>
        <App/>
      </Layout>
    );
    return (
      displayAppScreen? children : <OnbaordScreen />
    );
  };
  
  return (
    <StorageContextProvider 
    value={
      {
        // currentEpoches: data?.[1].result?.currentEpoches || 0n,
        // recordEpoches: data?.[1].result?.recordEpoches || 0n, 
        // analytics: data?.[1].result?.analytics || ANALYTICS,
        symbol: data?.[0].result || 'USD',
        setstorage,
        displayForm,
        closeDisplayForm,
        openDisplayForm,
        message,
        exitOnboardScreen,
        toggleSidebar,
        showSidebar,
        setmessage,
        displayAppScreen,
        openPopUp,
        displayOnboardUser,
        activePath,
        setActivepath,
        togglePopUp,
        toggleDisplayOnboardUser,
      }}
    >
      <div >
        { displayScreen() }
      </div>
    </StorageContextProvider>
  );
}
