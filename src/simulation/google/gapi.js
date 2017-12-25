/* eslint no-console: 0 */
// eslint-disable-next-line no-use-before-define
import DriveService from './drive-service';
import LoginService from './login-service';
// import gapi from 'googleapis';
const gapi = window.gapi;

// Client ID and API key from the Developer Console
const CLIENT_ID = '859895141676-u1ffb52alfhrc00kgqelef579avkpaqt.apps.googleusercontent.com';

// Array of API discovery doc URLs for APIs used by the quickstart
const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES = 'https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/documents';

window.loginService = new LoginService(CLIENT_ID, SCOPES, DISCOVERY_DOCS);
window.driveService = new DriveService();

const login = window.loginService;
const drive = window.driveService;

function initGapi(updateAuthStatus) {
  gapi.load('client:auth2', () => {
    login.initClient(updateAuthStatus);
  });
}

function signIn() {
  login.signIn();
}

function signOut() {
  login.signOut();
}

/**
 *  Sign in with promise
 */
function authorize() {
  return Promise.resolve(gapi.auth2.getAuthInstance().signIn());
}

function isSignedIn() {
  let status = null;
  if (gapi.auth2) {
    status = gapi.auth2.getAuthInstance().isSignedIn.get();
  }
  return status;
}

function createAndPublishFile(name, done) {
  const file = {
    content: 'Welcome to Google Phone Screen Simulator! Please listen to our interviewer for the next instruction. If you have suggestions or find bugs, please report to our Github repo. Wish you a successful interview! \n\nInstructions:\n1. Check button: Skip to the next phase.\n2. Stop button: Stop current interview.\n3. Play button: Start your interview!\n',
    id: null,
    name,
  };
  drive.createAndPublishFile(file, done);
}

function addContent(id, content) {
  const file = {
    id,
  };
  drive.loadFile(file, (res) => {
    const newFile = {
      id,
      content: res.content + content,
    };
    drive.saveFile(newFile, () => {});
  });
}

function newContent(id, content) {
  const file = {
    id,
    content,
  };
  drive.saveFile(file, () => {});
}

function loadContent(id, done) {
  const file = {
    id,
  };
  drive.loadFile(file, (res) => {
    done(res);
  });
}

export default {
  initGapi,
  signIn,
  signOut,
  authorize,
  isSignedIn,
  createAndPublishFile,
  addContent,
  newContent,
  loadContent,
};
