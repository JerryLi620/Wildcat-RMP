chrome.runtime.onMessage.addListener(function getRate(
  request,
  sender,
  sendResponse
) {
  if (request.method == "getSelection") {
    var profName = window.getSelection().toString().split(" ").join("+");
    var url =
      "https://ancient-bastion-22221.herokuapp.com/https://ratemyprofessors.com/search.jsp?queryBy=teacherName&queryoption=HEADER&facetSearch=true" +
      "&query=" +
      profName +
      "&sid=U2Nob29sLTM5NjU=";
    console.log(url);
    chrome.runtime.sendMessage({ query: url }, function (response) {
      console.log(response.data);
    });
  }
});
