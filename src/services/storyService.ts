// import { StoryClient, StoryConfig } from "@story-protocol/core-sdk";
// import { http } from "viem";

// // Load environment variables for Story Protocol
// const privateKey = process.env.REACT_APP_WALLET_PRIVATE_KEY;
// const rpcProviderUrl = process.env.REACT_APP_STORY_RPC_PROVIDER_URL;

// const storyConfig: StoryConfig = {
//   transport: http(rpcProviderUrl!),
//   account: `0x${privateKey}`, // Your wallet private key or signer
//   chainId: "iliad", // Chain ID for Story Protocol
// };

// const storyClient = StoryClient.newClient(storyConfig);

// export async function registerIP(contentId: string, ipData: any) {
//   try {
//     const registration = await storyClient.registerIP({
//       contentId,
//       data: ipData, // Your IP-related data here
//     });
//     console.log("IP registered:", registration);
//   } catch (error) {
//     console.error("Error registering IP:", error);
//   }
// }
