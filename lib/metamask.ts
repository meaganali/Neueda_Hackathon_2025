import { ethers } from 'ethers';

// Types
export interface MetaMaskState {
  isConnected: boolean;
  account: string | null;
  chainId: number | null;
  provider: any;
  signer: any;
}

// Initial state
const initialState: MetaMaskState = {
  isConnected: false,
  account: null,
  chainId: null,
  provider: null,
  signer: null,
};

// Check if MetaMask is installed
export const isMetaMaskInstalled = (): boolean => {
  return typeof window !== 'undefined' && window.ethereum !== undefined;
};

// Connect to MetaMask
export const connectWallet = async (): Promise<MetaMaskState> => {
  if (!isMetaMaskInstalled()) {
    throw new Error('MetaMask is not installed');
  }

  try {
    // Request account access
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const { chainId } = await provider.getNetwork();
    
    return {
      isConnected: true,
      account: accounts[0],
      chainId,
      provider,
      signer
    };
  } catch (error) {
    console.error('Error connecting to MetaMask:', error);
    return initialState;
  }
};

// Check if already connected
export const checkConnection = async (): Promise<MetaMaskState> => {
  if (!isMetaMaskInstalled()) {
    return initialState;
  }

  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const accounts = await provider.listAccounts();
    
    if (accounts.length > 0) {
      const signer = provider.getSigner();
      const { chainId } = await provider.getNetwork();
      
      return {
        isConnected: true,
        account: accounts[0],
        chainId,
        provider,
        signer
      };
    }
    
    return initialState;
  } catch (error) {
    console.error('Error checking MetaMask connection:', error);
    return initialState;
  }
};

// Disconnect from MetaMask
export const disconnectWallet = (): MetaMaskState => {
  // Note: MetaMask doesn't support programmatic disconnection,
  // so we just clear the local state
  return initialState;
};

// Send a transaction (for donation)
export const sendTransaction = async (
  to: string,
  amount: string,
  data: string = ''
): Promise<{ success: boolean; txHash?: string; error?: string }> => {
  try {
    const state = await checkConnection();
    
    if (!state.isConnected || !state.signer) {
      throw new Error('Wallet not connected');
    }

    // Convert amount from ETH to Wei
    const amountInWei = ethers.utils.parseEther(amount);
    
    // Create transaction object
    const tx = {
      to,
      value: amountInWei,
      data: ethers.utils.hexlify(ethers.utils.toUtf8Bytes(data)),
    };

    // In this implementation, we're not actually sending the transaction
    // for real money, just simulating the process
    console.log('Would send transaction:', tx);
    
    // For testing purposes, generate a mock tx hash
    const mockTxHash = '0x' + [...Array(64)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
    
    return {
      success: true,
      txHash: mockTxHash
    };
  } catch (error: any) {
    console.error('Error sending transaction:', error);
    return {
      success: false,
      error: error.message || 'Transaction failed'
    };
  }
};

// Setup event listeners for MetaMask events
export const setupMetaMaskListeners = (
  onAccountsChanged: (accounts: string[]) => void,
  onChainChanged: (chainId: string) => void,
  onDisconnect: () => void
) => {
  if (!isMetaMaskInstalled()) return;

  window.ethereum.on('accountsChanged', onAccountsChanged);
  window.ethereum.on('chainChanged', onChainChanged);
  window.ethereum.on('disconnect', onDisconnect);

  return () => {
    window.ethereum.removeListener('accountsChanged', onAccountsChanged);
    window.ethereum.removeListener('chainChanged', onChainChanged);
    window.ethereum.removeListener('disconnect', onDisconnect);
  };
};

// Declare window.ethereum for TypeScript
declare global {
  interface Window {
    ethereum: any;
  }
} 