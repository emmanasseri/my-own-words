// background.js
let highlightedText = "";

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.text) {
    highlightedText = message.text;
    console.log("Stored highlighted text:", highlightedText); // Log the stored text
  }
});

// Listen for requests to get highlighted text
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.request === "getHighlightedText") {
    sendResponse({ text: highlightedText });
    console.log("Sending highlighted text:", highlightedText); // Log when sending back
  }
});
