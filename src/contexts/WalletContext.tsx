import React, { createContext, useContext } from "react";
import { mintNFT as mintNFTService } from "../services/PolygonService";

interface WalletContextProps {
  userWalletAddress: string;
  mintNFT: (
    contentID: string,
    tokenName: string,
    tokenLabel: string
  ) => Promise<void>;
}

const WalletContext = createContext<WalletContextProps | undefined>(undefined);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const userWalletAddress = process.env.REACT_APP_USER_WALLET_ADDRESS!;

  const mintNFT = async (
    contentID: string,
    tokenName: string,
    tokenLabel: string
  ) => {
    // Call mintNFT from PolygonService and pass the userWalletAddress as recipient
    await mintNFTService(userWalletAddress, contentID, tokenName, tokenLabel);
  };

  return (
    <WalletContext.Provider value={{ userWalletAddress, mintNFT }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};
