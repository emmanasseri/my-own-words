import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import createMetaMaskProvider from 'metamask-extension-provider';

// Declare the 'ethereum' property globally
declare global {
  interface Window {
    ethereum?: any;
  }
}

interface Web3ContextType {
  walletAddress: string;
  networkId: number;
  connectWallet: () => Promise<void>;
}

const Web3Context = createContext<Web3ContextType | null>(null);

export const Web3Provider = ({ children }: { children: ReactNode }) => {
  const [walletAddress, setWalletAddress] = useState("");
  const [networkId, setNetworkId] = useState(0);

  // Function to connect MetaMask wallet
  const connectWallet = async () => {
    console.log("Connecting wallet...");
    const provider = createMetaMaskProvider();
    console.log("Provider created:", provider);

    if (!provider) {
        console.error("MetaMask provider not detected.");
        throw new Error("MetaMask provider not detected.");
    }

    await Promise.all([
        provider.request({
            method: 'eth_requestAccounts',
        }),
        provider.request({ method: 'eth_chainId' }),
    ]);

    const chainId = provider.chainId;
    const account = provider.selectedAddress;
    console.log("Connected to wallet:", account);
    console.log("Connected to network:", chainId);
    }
  

  return (
    <Web3Context.Provider value={{ walletAddress, networkId, connectWallet }}>
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3 = () => useContext(Web3Context);
