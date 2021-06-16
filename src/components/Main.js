import React, {useState} from "react";
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import auth_state from '../service/auth_state'




function Main() {
  
  if(!Cookies.get("userInfo")){
      
    return <Redirect to='/login'  />
  }else{
      
      
      const userData = JSON.parse(Cookies.get("userInfo"))
      
    

      return <div>
      <h1>React cookies</h1>
       
       <p>{userData.jwt_id}</p>
       
       
       <img src={userData.pfp} alt={userData.username} height='50px' width='50px'/>
       

      
       
    </div>
  
}
}

export default Main;




