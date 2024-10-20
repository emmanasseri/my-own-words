import React, { createContext, useContext, useState, useEffect } from "react";

const DisputeContext = createContext();

export const DisputeProvider = ({ children }) => {
    const [claim, setClaim] = useState("");
    const [ipAssetId1, setIpAssetId1] = useState("");
    const [ipAssetId2, setIpAssetId2] = useState("");
    
    return (
        <DisputeContext.Provider value={{ claim, setClaim, ipAssetId1, setIpAssetId1, ipAssetId2, setIpAssetId2 }}>
        {children}
        </DisputeContext.Provider>
    );
    }

export const useDispute = () => {
    const context = useContext(DisputeContext);
    return context;
}