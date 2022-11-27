function test() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(
      tabs[0].id,
      { method: "getSelection" },
      function (response) {
        alert(response.data);
      }
    );
  });
}

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("test").addEventListener("click", test);
});
