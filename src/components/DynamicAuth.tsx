import React from 'react';
import { DynamicContextProvider, DynamicWidget } from '@dynamic-labs/sdk-react-core';
import { EthereumWalletConnectors } from '@dynamic-labs/ethereum';

const DynamicAuth = () => {
  return (
    <DynamicContextProvider
      settings={{
        environmentId: 'd025aa30-0b0b-43b7-a8c3-03431306234d',
        walletConnectors: [EthereumWalletConnectors],
      }}
    >
      <DynamicWidget />
    </DynamicContextProvider>
  );
};

export default DynamicAuth;
