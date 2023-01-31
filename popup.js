function search() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(
      tabs[0].id,
      {
        method: "getSelection",
      },
      function (response) {
        var prof = {
          dept: response.info.department,
          avgRating: response.info.avgRating,
          numRating: response.info.numRatings,
          difficulty: response.info.avgDifficulty,
          takeAgain: Math.ceil(response.info.wouldTakeAgainPercent) + "%",
          firstName: response.info.firstName,
          lastName: response.info.lastName,
          link:
            "https://www.ratemyprofessors.com/professor?tid=" +
            response.info.legacyId,
        };
        if (prof.numRating == 0) {
          prof.takeAgain = 0;
        }
        addElement(prof);
      }
    );
  });
}

function addElement(prof) {
  document
    .getElementById("firstName")
    .appendChild(document.createTextNode(prof.firstName));
  document
    .getElementById("lastName")
    .appendChild(document.createTextNode(prof.lastName));
  document
    .getElementById("dept")
    .appendChild(document.createTextNode(prof.dept));
  document
    .getElementById("avgRating")
    .appendChild(document.createTextNode(prof.avgRating));
  document
    .getElementById("numRating")
    .appendChild(document.createTextNode(prof.numRating));
  document
    .getElementById("difficulty")
    .appendChild(document.createTextNode(prof.difficulty));
  document
    .getElementById("takeAgain")
    .appendChild(document.createTextNode(prof.takeAgain));
  document.getElementById("link").href = prof.link;
}

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("search").addEventListener("click", search);
});
