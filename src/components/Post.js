import { Typography, Button, Box, TextField } from '@material-ui/core';
import axios from "axios"
import {useState} from "react";
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';

function Post(){
    const [postCharacters, setPostCharacters] = useState();
    const [errorBool, setErrorBool] = useState(false);
    
    
    if(!Cookies.get('userInfo')){
        return <Redirect to='/login'  />
      }else{
        
          
         const userData = JSON.parse(Cookies.get('userInfo'));
       
        function postData(event){
            event.preventDefault();
            if(postCharacters.length>500){
                return;
                
            }else{
                axios.post("/new/post", { 	headers: { "id": userData.id, "body":postCharacters } })
            }
         }

       

       return <Box  style={{'display':'flex', 'justifyContent':'center'}}>
       <Box>
        <Typography variant="h4" style={{'marginBottom':'1rem'}}>Make a Post</Typography>
           <TextField
           error={errorBool}
          style={{'whiteSpace': 'pre-wrap'}}
          label="Your Post"
          multiline
          
          rows={10}
          autoFocus={true}
          
          variant="outlined"
          onChange={(event)=>{setPostCharacters(event.target.value);
            try{
                postCharacters.length>500 ? setErrorBool(true) : setErrorBool(false)
            }catch(err){
                
            }
            
          }}
        />
        
        <Typography style={{'textAlign':'right'}}>{postCharacters ? postCharacters.trim().length : "0"}/500</Typography>
        <Button onClick={postData} variant="contained" color="primary">Post</Button>
        

        </Box>
       </Box>
}
}


export default Post;