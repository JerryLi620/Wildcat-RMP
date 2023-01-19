function search() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var tab = tabs[0];
    chrome.tabs.sendMessage(tabs[0].id, { method: "getSelection" });
  });
}

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("search").addEventListener("click", search);
});
