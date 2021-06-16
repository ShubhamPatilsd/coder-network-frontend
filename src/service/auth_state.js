import firebase from '../config/firebase-config.js'

export default function auth_state(){
    firebase.auth().onAuthStateChanged((user)=>{
    
    if(user){
      return user.providerData[0]
    }else{
        return null;
    }
})
}