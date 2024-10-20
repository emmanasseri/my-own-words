// this will store the highlighted text on the webpage
import React, { createContext, useContext, useState, useEffect } from "react";
const browser = window.browser || window.chrome;

const HighlightContext = createContext();

export const HighlightProvider = ({ children }) => {
    const [highlightedText, setHighlightedText] = useState("");

    useEffect(() => {
        // This listener will receive the message from background or content script
        browser.runtime.onMessage.addListener((message) => {
          console.log("Message received in popup:", message);  // Check if this logs the message
          if (message.text) {
            setHighlightedText(message.text);  // Update state with highlighted text
          }
        });
    }, []);
    
    return (
        <HighlightContext.Provider value={{ highlightedText }}>
        {children}
        </HighlightContext.Provider>
    );
    }

export const useHighlight = () => {
    const context = useContext(HighlightContext);
    return context;
}
