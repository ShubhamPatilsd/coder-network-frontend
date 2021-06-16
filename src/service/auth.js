import firebase from '../config/firebase-config';



const githubLogin=() =>{
    
    const githubProvider = new firebase.auth.GithubAuthProvider();
    return firebase.auth().signInWithPopup(githubProvider).then((res)=>{
        
        return res;
    }).catch((er)=>{
        return er;
    })
    
    
};

export default githubLogin;