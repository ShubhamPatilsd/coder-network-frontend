import firebase from '../config/firebase-config';

var githubProvider = new firebase.auth.GithubAuthProvider();
githubProvider.addScope("repo");
const githubLogin= () =>{
    return firebase.auth().signInWithPopup(githubProvider).then((res)=>{
        
        return res;
    }).catch((er)=>{
        return er;
    })
};

export default githubLogin;