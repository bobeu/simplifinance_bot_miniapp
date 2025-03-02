import React from 'react';
import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import type { AppProps } from 'next/app';
import AppProvider from '../components/AppProvider';
import ErrorBoundary from '@/components/ErrorBoundary';

export default function App({ Component, pageProps }: AppProps) {
  const [isMounted, setMount] = React.useState(false);
  React.useEffect(() => setMount(true), []);

  return (
    <React.Fragment>
        {
          isMounted? 
            <ErrorBoundary fallback={<p>Something went wrong</p>}>
              <AppProvider>
                <Component {...pageProps}/>
              </AppProvider>
            </ErrorBoundary> : null
        }
      </React.Fragment>
    );
}
