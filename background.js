chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  fetch(request.query)
    .then((response) => response.json)
    .then((data) => {
      // Send the rating data back to the content script
      sendResponse({ data: data });
    })
    .catch((error) => {
      console.error(error);
    });
  return true;
});
