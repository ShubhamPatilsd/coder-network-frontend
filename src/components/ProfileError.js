import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import doge from '../images/profile_error_doge.png';

function ProfileError(){
       return <Box style={{'textAlign':'center'}}>
            <img alt="whoops, not found" src={doge} width="45%" height="45%" style={{'maxHeight':'576px', 'maxWidth':'500px', 'marginBottom':'1rem'}}/>
           <Typography variant="h2">Hmm, we couldn't find that profile. Enter a valid one next time.</Typography>
       </Box>
}

export default ProfileError;