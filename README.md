# My Own Words: a browser extension organizing the provenance and nuance of ideas on the Story Network.  

Users can create written work in the editor of their choice, highlight it, attach terms of fair use and register a snapshot of its provenance and permissions. There is AI support natively integrated into the project for users unfamiliar Story or IP to still have understanding, agency, and support as they navigate registering new works. 

We see this project being especially useful for two audiences: researchers and academics who very much value the provenance of ideas, creators and artists across industries. 

## How to Use

Our project has a server and client side, so in order to run:

1. Run `cd server`. From there, type the commands `yarn` and `node server.js` to install dependencies and start the backend.
2. Next, head to the client side with `cd ../client` and run `yarn` to install dependencies.
3. Then, run `yarn build` to generate a bundled copy named "build" of the software to be compatible with modern browsers supporting extensions.
4. Head over to the your browser's extension settings, enable developer mode, and find the "load unpacked option", click it.
5. Finally, take open the "build" folder. This is allow your browser to install the extension.

### How it's Made

This project uses Pinata and IPFS for storage of text files, Polygon for tokenization of these files' content IDs, and Story SDK for registering these NFTs onchain with licensing terms.  

We used React, Typescript, ChakraUI, and Emma's original Procreate animations for the front end. For the backend, we used an express server, cors for browser extension to server communication. We also used the ChatGPT API to create and fine-tune our AI arbiter and AI also to auto-suggest recommendations for descriptions, licensing terms, etc. for a simple introduction to IP. 

![image](https://github.com/user-attachments/assets/39e11bea-0832-435c-bb8a-6669ac3975d2)

![image](https://github.com/user-attachments/assets/08956a34-7839-4987-9657-01bfb3ed7ef9)


### 
