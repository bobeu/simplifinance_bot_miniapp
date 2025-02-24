import React from "react";
import OnbaordScreen from "@/components/OnboardScreen";
import { Path,} from "@/interfaces";
import { StorageContextProvider } from "@/components/StateContextProvider";
import App from "@/components/App";
import Layout from "@/components/Layout";

export default function SimpliApp() {
  const [displayAppScreen, setDisplay] = React.useState<boolean>(false);
  const [message, setMessage] = React.useState<string>('');
  const [displayOnboardUser, setDisplayOnboardUser] = React.useState<boolean>(false);
  const [activePath, setActivePath] = React.useState<Path>('/dashboard');
    
  const toggleDisplayOnboardUser = () => setDisplayOnboardUser(!displayOnboardUser);
  const exitOnboardScreen = () => setDisplay(true);
  const setmessage = (arg: string) => setMessage(arg);
  const setActivepath = (arg:Path) => setActivePath(arg);

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
          message,
          exitOnboardScreen,
          setmessage,
          displayAppScreen,
          displayOnboardUser,
          activePath,
          setActivepath,
          toggleDisplayOnboardUser,
      }}
    >
      <div >
        { displayScreen() }
      </div>
    </StorageContextProvider>
  );
}