import React, {useState, useEffect} from "react";
import axios from 'axios';
import auth_header from '../config/axios-auth';

import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import ProfileError from './ProfileError';
import Loading from './Loading';


const useStyles = makeStyles((theme) => ({
    
    large: {
      width: theme.spacing(15),
      height: theme.spacing(15),
    }
  }));





function Profile(props) {

  const [errID, setErrID] = useState(false);
  const classes = useStyles();
  const [user_id, setUserID] = useState();
  const [followers, setFollowers] = useState();
  const [following, setFollowing] = useState();
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);

  
     
      
      
      const getInfo= async ()=>{
        try{
            const response = await axios.get(`https://api.github.com/users/${props.match.params.user}`, auth_header)
            setUserID(response.data.id);
            setFollowers(response.data.followers);
            setFollowing(response.data.following);
            setName(response.data.login);
            setLoading(false);
        }catch(error){
            setErrID(true);
            setLoading(false);
        }
        
        
      }
      
     
        
    
      //<p>{user_id}</p>
        //<img src={userData.pfp} alt="test" height='50px' width='50px'/>
    
      getInfo();
      if(loading){
        return <Loading/>;
      }
      return errID ? <ProfileError/> : <Box style={{'textAlign':'center'}}>
      <Typography variant="h2">{name+"'s profile"}</Typography>
       

       <Box style={{'display':'flex','justifyContent':'center', 'marginTop':'2rem'}}>
            <Avatar alt={name} src={`https://avatars.githubusercontent.com/u/${user_id}?v=4.png`} className={classes.large} />
            
       </Box>

       <Box textAlign="center">
            <Typography variant="h6">{name}</Typography>
            <Box style={{'display':'inline-flex'}}>
                <Typography variant="h6" style={{'display':'flex','marginRight':"0.5rem",  'alignItems':'center'}}>{<PeopleOutlineIcon style={{'marginRight':'0.5rem'}}/>}Followers: {followers}</Typography>
                <Typography variant="h6" style={{'marginRight':"0.5rem"}}>•</Typography>
                <Typography variant="h6">Following: {following}</Typography>
            </Box>
       </Box>

       
       

      
       
    </Box>
      
}



export default Profile;




