// GraphQL queries to get the professor's info from RMP
const PROFESSOR_ID = `
  query ($query: TeacherSearchQuery!) {
    newSearch {
      teachers(query: $query) {
        edges {
          node {
            id
          }
        }
      }
    }
  }
`;

const PROFESSOR_DATA = `
  query ($id: ID!) {
    node(id: $id) {
      ... on Teacher {
        id
        department
        legacyId
        firstName
        lastName
        avgRating
        numRatings
        avgDifficulty
        wouldTakeAgainPercent
      }
    }
  }
`;

const AUTH_TOKEN = "Basic dGVzdDp0ZXN0";
const SCHOOL_ID = "U2Nob29sLTM5NjU=";

const fetchProfIDHelper = async (profName) => {
  return new Promise(async (resolve, reject) => {
    let response = null;
    let raw_response = null;
    raw_response = await fetch("https://www.ratemyprofessors.com/graphql", {
      method: "POST",
      headers: {
        Authorization: AUTH_TOKEN,
      },
      body: JSON.stringify({
        query: PROFESSOR_ID,
        variables: {
          query: { text: profName, schoolID: SCHOOL_ID },
        },
      }),
    });
    response = await raw_response.json();
    if (response.data.newSearch.teachers.edges.length !== 0) {
      resolve(response);
      return;
    }
    resolve(response);
    return;
  });
};

const fetchProfID = async (profName) => {
  return fetchProfIDHelper(profName);
};

const queryProfID = async function queryProfIDAsync(profName, sendResponse) {
  try {
    const response = await fetchProfID(profName);
    sendResponse(response);
  } catch (error) {
    sendResponse(new Error(error));
  }
};

const fetchProfData = (profID) => {
  const profDataFetch = fetch("https://www.ratemyprofessors.com/graphql", {
    method: "POST",
    headers: {
      Authorization: AUTH_TOKEN,
    },
    body: JSON.stringify({
      query: PROFESSOR_DATA,
      variables: {
        id: profID,
      },
    }),
  });

  return profDataFetch;
};

const queryProfData = async function queryProfDataAsync(profID, sendResponse) {
  try {
    const raw_response = await fetchProfData(profID);
    const response = await raw_response.clone().json();

    sendResponse(response);
  } catch (error) {
    sendResponse(new Error(error));
  }
};

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  switch (request.contentScriptQuery) {
    case "queryProfID":
      queryProfID(request.profName, sendResponse);
      return true;

    case "queryProfData":
      queryProfData(request.profID, sendResponse);
      return true;

    default:
      return true;
  }
});
