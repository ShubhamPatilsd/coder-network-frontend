import React, {useState, useEffect} from "react";
import axios from 'axios';
import auth_header from '../config/axios-auth';

import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';

import EventNoteIcon from '@material-ui/icons/EventNote';

import ProfileError from './ProfileError';
import Loading from './Loading';

import extractDate from '../service/iso_converter';



const preventDefault = (event) => event.preventDefault();
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
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true);
  const [bio, setBio] = useState();
  const [dateCreated, setDateCreated] = useState();

  
     
      
      
      const getInfo= async ()=>{
        try{
            const response = await axios.get(`https://api.github.com/users/${props.match.params.user}`, auth_header)
            setUserID(response.data.id);
            setFollowers(response.data.followers);
            setFollowing(response.data.following);
            setUsername(response.data.login);
            setBio(response.data.bio);
            setDateCreated(response.data.created_at);
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
      <Typography variant="h2">{username+"'s profile"}</Typography>
       

       <Box style={{'display':'flex','justifyContent':'center', 'marginTop':'2rem'}}>
            <Avatar alt={username} src={`https://avatars.githubusercontent.com/u/${user_id}?v=4.png`} className={classes.large} />
            
       </Box>

       <Box textAlign="center">
            <Typography variant="h6"><Link href={`https://github.com/${username}`} onClick={preventDefault}>{"@"+username}</Link></Typography>
            {bio ? <Typography variant="h5" style={{'color':'grey'}}>{bio}</Typography>: undefined}
            <Box style={{'display':'inline-flex', 'marginTop':'1rem'}}>
                <Typography variant="h6" style={{'display':'flex','marginRight':"0.5rem",  'alignItems':'center'}}>{<PeopleOutlineIcon style={{'marginRight':'0.5rem'}}/>}Followers: {followers}</Typography>
                <Typography variant="h6" style={{'marginRight':"0.5rem"}}>•</Typography>
                <Typography variant="h6">Following: {following}</Typography>
            </Box>

            <Box>
                <Typography variant="h6" style={{'display':'inline-flex', 'alignItems':'center'}}>{<EventNoteIcon style={{'marginRight':'0.5rem'}}/>}Joined on {extractDate(dateCreated)}</Typography>
            </Box>
            
       </Box>

       
       

      
       
    </Box>
      
}



export default Profile;




