import React, {useState} from "react";
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom';
import axios from 'axios';




function Main() {
  const [user_id, setUserID] = useState();
  if(!Cookies.get('userInfo')){
    return <Redirect to='/login'  />
  }else{
      
      
      const userData = JSON.parse(Cookies.get('userInfo'));
      
      /*const getId= async ()=>{
        const response = await axios.get(`https://api.github.com/users/${userData.username}`)
        setUserID(response.data.id);
      }*/
      
      //getId();
      //<p>{user_id}</p>

      return <div>
      <h1>React cookies</h1>
       <p>{userData.id}</p>
       
       <img src={userData.pfp} alt="test" height='50px' width='50px'/>

      
       
    </div>
  
}
}

export default Main;




