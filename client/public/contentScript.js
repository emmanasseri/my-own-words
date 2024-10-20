// Content script to detect highlighted text
console.log("Content script loaded!");

document.addEventListener('mouseup', function () {
  const selectedText = window.getSelection().toString().trim();
  if (selectedText.length > 0) {
    console.log("Selected text in content script:", selectedText);
    chrome.runtime.sendMessage({ text: selectedText });
  }
});
