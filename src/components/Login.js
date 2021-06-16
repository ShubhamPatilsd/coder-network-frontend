import React, {useState, useEffect} from 'react';
import Cookies from 'js-cookie'
import axios from 'axios';
import {Redirect} from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import LockOpenIcon from '@material-ui/icons/LockOpen';

import Fade from 'react-reveal/Fade';
import Box from '@material-ui/core/Box';
import githubLogin from '../service/auth';





function Login() {
    
    const [redirect, setRedirect] = useState(false);
    useEffect(()=>{
        document.body.style = 'background: rgb(240,242,245);';
    });
    const loginAsync = async () =>{
        
        const res = await githubLogin();
        
        //redirect them to /
        //username: res.additionalUserInfo.username,
        // Cookies.set('userInfo', {
        //     id: res.additionalUserInfo.profile.id,
        //     pfp: (res.additionalUserInfo.profile.avatar_url).toString()+'.png',
        //     accessToken: res.credential.accessToken

        // }, {expires: 29})

        
        console.log(res)
        const jwtted_id=await axios.post("/jwt_auth", { 	headers: { "id": res.additionalUserInfo.profile.id } })
        console.log(jwtted_id)
        axios.post("/new/user", { 	headers: { "id": jwtted_id } })
        
        //accessToken: res.credential.accessToken
        Cookies.set('userInfo', {
            jwt_id: jwtted_id.data,
            pfp: (res.additionalUserInfo.profile.avatar_url).toString()+'.png',
            username: res.additionalUserInfo.profile.login
                
        
        }, {expires: 29})

        setRedirect(true)
        
        
        //setCookie('auth_data', "res", { path: '/' , SameSite:'Strict'});
        
            
        
        
    }

if(redirect){
    return <Redirect to='/'  />
}else{
    
    
    return <div style={{'text-align': 'center'}}>
  
  <Fade bottom>
  
    <Box  textAlign='center' style={{'background-color':'white',
            'height': '456px',
            'width': '100%',
            'max-width': '396px',
            'box-shadow':'0 3px 8px rgba(0, 0, 0, .25)',
            
            'word-wrap': 'break-word',

        'margin':'auto', 'border-radius':'7px', }} paddingBottom='2rem' paddingTop='1rem'>
    
    
    <Box style={{ 'margin-bottom':'2rem' }}>
        <Typography variant="h4" style={{'font-weight': '800', 'margin-top':'10%', 'margin-right': '10px', 'margin-left': '10px'}}>Welcome to the <br/><span style={{'background': 'linear-gradient(to right, #43e97b 0%, #38f9d7 100%)',
            '-webkit-background-clip': 'text',
            '-webkit-text-fill-color': 'transparent', 'margin-right': '10px', 'margin-left': '10px'}}>Coder Network</span></Typography>
        
        <Typography variant="h5" style={{'font-weight': '400', 'margin-top':'10%', 'margin-right': '10px', 'margin-left': '10px'}}>A social media platform for programmers</Typography>
        

    </Box>

    
    <Button  onClick={loginAsync} style={{
        
    }}variant="contained" startIcon={<LockOpenIcon />}>Login With GitHub</Button>
    
    
    
    </Box>
  </Fade>
  
  
  
  </div>
  
}
}

export default Login;


