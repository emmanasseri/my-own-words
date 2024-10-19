import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { StoryClient, StoryConfig } from "@story-protocol/core-sdk";
import { http } from "viem";
import { Account, privateKeyToAccount, Address } from "viem/accounts";
import "./index.css";
import App from "./App";
import theme from "./theme";

// Ensure environment variables are loaded securely
const privateKey = process.env.REACT_APP_WALLET_PRIVATE_KEY; // Use a secure environment variable
const rpcProviderUrl = process.env.REACT_APP_STORY_RPC_PROVIDER_URL; // RPC URL for Story Protocol

// If using private keys, ensure this is securely managed (not recommended for frontend)
if (!privateKey || !rpcProviderUrl) {
  console.error("Private key or RPC provider URL is missing!");
} else {
  const account = privateKeyToAccount(`0x${privateKey}`);

  const config: StoryConfig = {
    transport: http(rpcProviderUrl),
    account: account, // the account object created from the private key
    chainId: "iliad", // Chain ID for Story Protocol
  };

  // Initialize Story Client
  const client = StoryClient.newClient(config);
  console.log("Story Protocol client initialized:", client);
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
