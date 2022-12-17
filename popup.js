function search() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var tab = tabs[0];
    var tabId = tab.id;
    // The ID of the current tab is now stored in the `tabId` variable
    chrome.scripting.executeScript({
      target: { tabId: tabId, allFrames: true },
      files: ["contentScript.js"],
    });
    chrome.tabs.sendMessage(tabs[0].id, { method: "getSelection" });
  });
}

document.getElementById("search").addEventListener("click", search);
