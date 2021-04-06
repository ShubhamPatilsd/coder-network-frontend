import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import LoadingIcon from './LoadingIcon';

function Loading(){
       return <Box style={{'textAlign':'center', 'display':'flex', 'justifyContent':'center'}}>
            <LoadingIcon/>
           <Typography style={{'position':'absolute','top':'50%', 'left':'50%', 'transform':'translate(-50%, -50%)'}} variant="h2">Loading...</Typography>
       </Box>
}

export default Loading;