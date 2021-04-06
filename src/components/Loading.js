import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function Loading(){
       return <Box style={{'textAlign':'center', 'display':'flex', 'justifyContent':'center'}}>
           <Typography style={{'position':'absolute','top':'50%', 'left':'50%', 'transform':'translate(-50%, -50%)'}} variant="h1">Loading...</Typography>
       </Box>
}

export default Loading;