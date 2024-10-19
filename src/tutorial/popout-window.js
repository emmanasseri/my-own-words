document.getElementById('popup-btn').addEventListener('click', () => {
    chrome.windows.create({
      url: 'https://www.google.com',  // Replace this URL with the content you want in the pop-out window
      type: 'popup',
      width: 400,
      height: 400
    });
  });
  