"use client"

import { WagmiProvider } from "wagmi";
import { getDefaultConfig, RainbowKitProvider, lightTheme } from "@rainbow-me/rainbowkit";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { str } from "@/utilities";
import { ReactNode } from "react";
import { Chain,} from "viem";
import { mock, } from 'wagmi/connectors';
import { UserRejectedRequestError } from "viem";
import { celoAlfajores } from 'wagmi/chains';

const projectId = str(process.env.NEXT_PUBLIC_PROJECT_ID);
if (!projectId) throw new Error('Project ID is undefined');

export const mockConnector = mock({
  accounts: ['0xD7c271d20c9E323336bFC843AEb8deC23B346352'],
  features: {
    connectError: new UserRejectedRequestError(new Error('Failed to connect')),
    reconnect: false
  }
});

const config = getDefaultConfig({
  appName: 'Simplifinance',
  projectId,
  appIcon: '/favicon-32x32.png',
  appDescription: 'A decentralized p2p, DeFi protocol',
  appUrl: 'https://simplifi-glxp.vercel.app',
  chains: [celoAlfajores],
  
});

const theme = lightTheme(
  {
    ...lightTheme.accentColors.orange,
    accentColorForeground: '#fdba74',
    borderRadius: 'large',
    fontStack: 'system',
    overlayBlur: 'small',
    accentColor: '#2E3231'
  }
)

export default function AppProvider({children} : {children: ReactNode}) {
  return(
    <WagmiProvider config={config}>
      <QueryClientProvider client={new QueryClient()}>
        <RainbowKitProvider modalSize="compact" theme={theme} initialChain={celoAlfajores.id} showRecentTransactions={true}>
          { children }
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}