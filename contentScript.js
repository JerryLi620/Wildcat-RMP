chrome.runtime.onMessage.addListener(async function getRate(
  request,
  sender,
  sendResponse
) {
  if (request.method == "getSelection") {
    const profName = window.getSelection().toString();
    console.log(profName);
    console.log(fetchProfIDFromName(profName));
    let ID = await fetchProfIDFromName(profName);
    console.log(fetchProfReviewFromID(ID));
  }
});

async function fetchProfIDFromName(name) {
  try {
    let response = await sendMessage({
      contentScriptQuery: "queryProfID",
      profName: name,
    });
    let profID = response.data.newSearch.teachers.edges[0].node.id;
    return profID;
  } catch (error) {
    return null;
  }
}

async function fetchProfReviewFromID(ID) {
  if (ID === null) {
    return null;
  }
  try {
    let response = await sendMessage({
      contentScriptQuery: "queryProfData",
      profID: ID,
    });
    let profData = response.data.node;
    return profData;
  } catch (error) {
    return null;
  }
}

function sendMessage(message) {
  return new Promise((resolve, _) => {
    chrome.runtime.sendMessage(message, (res) => {
      resolve(res);
    });
  });
}
