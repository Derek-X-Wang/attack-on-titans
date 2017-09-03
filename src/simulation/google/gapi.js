/* eslint no-console: 0 */
// eslint-disable-next-line no-use-before-define
// import gapi from 'googleapis';
const gapi = window.gapi;

// Client ID and API key from the Developer Console
const CLIENT_ID = '859895141676-u1ffb52alfhrc00kgqelef579avkpaqt.apps.googleusercontent.com';

// Array of API discovery doc URLs for APIs used by the quickstart
const DISCOVERY_DOCS = ['https://script.googleapis.com/$discovery/rest?version=v1'];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES = 'https://www.googleapis.com/auth/drive';

const SCRIPT_ID = 'MS4m4qtB1EeZd7L4cqfVOZzVqZDkFptAh';

/**
 *  Sign in the user upon button click.
 */
function authorize() {
  return Promise.resolve(gapi.auth2.getAuthInstance().signIn());
}

/**
 *  Sign out the user upon button click.
 */
function signout() {
  gapi.auth2.getAuthInstance().signOut();
}

function initGapiClient() {
  return gapi.client.init({
    discoveryDocs: DISCOVERY_DOCS,
    clientId: CLIENT_ID,
    scope: SCOPES,
  });
}

function setSignedInListener(listener) {
  gapi.auth2.getAuthInstance().isSignedIn.listen(listener);
}

/**
 *  On load, called to load the auth2 library and API client library.
 */
function loadGapiClient(callback) {
  gapi.load('client:auth2', callback);
}

/**
 * Load the API and make an API call.  Display the results on the screen.
 */
function callScriptFunction() {
  // Call the Execution API run method
  //   'scriptId' is the URL parameter that states what script to run
  //   'resource' describes the run request body (with the function name
  //              to execute)
  gapi.client.script.scripts.run({
    scriptId: SCRIPT_ID,
    resource: {
      function: 'getFoldersUnderRoot',
    },
  }).then((resp) => {
    const result = resp.result;
    if (result.error && result.error.status) {
      // The API encountered a problem before the script
      // started executing.
      console.log('Error calling API:');
      console.log(result);
    } else if (result.error) {
      // The API executed, but the script returned an error.

      // Extract the first (and only) set of error details.
      // The values of this object are the script's 'errorMessage' and
      // 'errorType', and an array of stack trace elements.
      const error = result.error.details[0];
      console.log(`Script error message: ${error.errorMessage}`);

      if (error.scriptStackTraceElements) {
        // There may not be a stacktrace if the script didn't start
        // executing.
        console.log(`Script error stacktrace: ${error.scriptStackTraceElements}`);
      }
    } else {
      const folderSet = result.response.result;
      // The structure of the result will depend upon what the Apps
      // Script function returns. Here, the function returns an Apps
      // Script Object with String keys and values, and so the result
      // is treated as a JavaScript object (folderSet).
      if (Object.keys(folderSet).length === 0) {
        console.log('No folders returned!');
      } else {
        console.log('Folders under your root folder:');
        Object.keys(folderSet).forEach((id) => {
          console.log(`\t${folderSet[id]} (${id}) `);
        });
      }
    }
  });
}

export default {
  authorize,
  signout,
  loadGapiClient,
  initGapiClient,
  setSignedInListener,
  callScriptFunction,
};
