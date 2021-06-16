import { Typography, Button, Box, TextField } from '@material-ui/core';
import axios from "axios"
import {useState} from "react";
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom';


function Post(){
    const [postCharacters, setPostCharacters] = useState();
    const [errorBool, setErrorBool] = useState(false);
    const [textColor, setTextColor] = useState("black");
    const [label, setLabel] = useState("Your Post");
    
    if(!Cookies.get('userInfo')){
        return <Redirect to='/login'  />
      }else{
        
         const userData = JSON.parse(Cookies.get('userInfo'));
       
        function postData(event){
            event.preventDefault();
            if(postCharacters.length>500){
                return;
                
            }else{
                axios.post("/new/post", { 	headers: { "id": userData.jwt_id, "body":postCharacters } })
            }
         }

       

       return <Box  style={{'display':'flex', 'justifyContent':'center'}}>
       <Box>
        <Typography variant="h4" style={{'marginBottom':'1rem'}}>Make a Post</Typography>
           <TextField
           error={errorBool}
          style={{'whiteSpace': 'pre-wrap'}}
          label={label}
          multiline
          
          rows={10}
          autoFocus={true}
          
          variant="outlined"
          onChange={(event)=>{
              event.preventDefault();
              setPostCharacters(event.target.value);
              
            try{
                event.target.value.length>500 ? setErrorBool(true) : setErrorBool(false);
                event.target.value.length>500 ? setLabel("Too Many Characters") : setLabel("Your Post")
                event.target.value.length>500 ? setTextColor("red") : setTextColor("black")
                
            }catch(err){
                
            }
            
          }}
        />
        
        <Typography style={{'textAlign':'right', "color":textColor}}>{postCharacters ? postCharacters.trim().length : "0"}/500</Typography>
        <Button onClick={postData} variant="contained" color="primary">Post</Button>
        

        </Box>
       </Box>
}
}


export default Post;