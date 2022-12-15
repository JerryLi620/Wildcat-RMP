chrome.runtime.onMessage.addListener(function getRate(
  request,
  sender,
  sendResponse
) {
  if (request.method == "getSelection") {
    var profName = window.getSelection().toString().split(" ").join("+");
    console.log(profName);
    var url =
      "http://www.ratemyprofessors.com/search.jsp?queryBy=teacherName&queryoption=HEADER&facetSearch=true" +
      "&query=" +
      "Chartier T" +
      "&sid=U2Nob29sLTM5NjU=";
    sendResponse({ data: url });
  }

  // chrome.runtime.sendMessage({ query: url }, function (response) {
  //   var div = document.createElement("div"); //create fake div to search for HTML nodes
  //   div.innerHTML = response.source;
  //   var resultsArray = div.getElementsByClassName("listing PROFESSOR");
  //   console.log(resultsArray);
  // });
});
