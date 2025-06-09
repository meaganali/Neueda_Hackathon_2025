"use client"

import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  MetaMaskState, 
  checkConnection, 
  connectWallet, 
  disconnectWallet,
  isMetaMaskInstalled, 
  setupMetaMaskListeners,
  sendTransaction
} from '@/lib/metamask';

interface MetaMaskContextType extends MetaMaskState {
  connect: () => Promise<void>;
  disconnect: () => void;
  sendEth: (to: string, amount: string, data?: string) => Promise<{ success: boolean; txHash?: string; error?: string }>;
  isInstalled: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: MetaMaskContextType = {
  isConnected: false,
  account: null,
  chainId: null,
  provider: null,
  signer: null,
  connect: async () => {},
  disconnect: () => {},
  sendEth: async () => ({ success: false }),
  isInstalled: false,
  isLoading: false,
  error: null
};

const MetaMaskContext = createContext<MetaMaskContextType>(initialState);

export const MetaMaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);
  const [state, setState] = useState<MetaMaskState>({
    isConnected: false,
    account: null,
    chainId: null,
    provider: null,
    signer: null
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  // Check if MetaMask is installed after component mounts
  useEffect(() => {
    setMounted(true);
    setIsInstalled(typeof window !== 'undefined' ? isMetaMaskInstalled() : false);
  }, []);

  // Check if user is already connected
  useEffect(() => {
    if (!mounted || !isInstalled) {
      return;
    }

    const checkInitialConnection = async () => {
      try {
        setIsLoading(true);
        const connectionState = await checkConnection();
        setState(connectionState);
      } catch (err: any) {
        setError(err.message || 'Failed to check wallet connection');
      } finally {
        setIsLoading(false);
      }
    };

    checkInitialConnection();
  }, [mounted, isInstalled]);

  // Setup MetaMask event listeners
  useEffect(() => {
    if (!mounted || !isInstalled) return;

    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0) {
        // User disconnected their wallet
        setState({
          isConnected: false,
          account: null,
          chainId: null,
          provider: null,
          signer: null
        });
      } else {
        // Account changed, update state
        setState(prevState => ({
          ...prevState,
          account: accounts[0]
        }));
      }
    };

    const handleChainChanged = (chainId: string) => {
      // Chain changed, reload the page as recommended by MetaMask
      window.location.reload();
    };

    const handleDisconnect = () => {
      setState({
        isConnected: false,
        account: null,
        chainId: null,
        provider: null,
        signer: null
      });
    };

    const removeListeners = setupMetaMaskListeners(
      handleAccountsChanged,
      handleChainChanged,
      handleDisconnect
    );

    return () => {
      if (removeListeners) removeListeners();
    };
  }, [mounted, isInstalled]);

  const connect = async () => {
    if (!isInstalled) {
      setError('MetaMask is not installed');
      return;
    }

    try {
      setError(null);
      setIsLoading(true);
      const connectionState = await connectWallet();
      setState(connectionState);
    } catch (err: any) {
      setError(err.message || 'Failed to connect wallet');
    } finally {
      setIsLoading(false);
    }
  };

  const disconnect = () => {
    setState(disconnectWallet());
  };

  const sendEth = async (to: string, amount: string, data = '') => {
    return sendTransaction(to, amount, data);
  };

  // To prevent hydration mismatch, only render children when component has mounted
  if (!mounted) {
    return null;
  }

  return (
    <MetaMaskContext.Provider
      value={{
        ...state,
        connect,
        disconnect,
        sendEth,
        isInstalled,
        isLoading,
        error
      }}
    >
      {children}
    </MetaMaskContext.Provider>
  );
};

export const useMetaMask = () => useContext(MetaMaskContext);
