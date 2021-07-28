import firebase from "../config/firebase-config";

const githubLogin = () => {
  const githubProvider = new firebase.auth.GithubAuthProvider();

  firebase.auth().signInWithRedirect(githubProvider);
};

export default githubLogin;
