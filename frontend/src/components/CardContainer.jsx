
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import Button from '@mui/material/Button';
import sitar from '../assets/sitar.jpg'
import Typography from '@mui/material/Typography';

const card = (
  <React.Fragment>
    <CardActionArea>
      <CardContent>
       
        <Typography variant="h5" component="div">
        <CardMedia
        component="img"
        height="194"
        image={sitar}
        alt="Paella dish"
      />
        </Typography>
        <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>adjective</Typography>
        <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </CardActionArea>
  </React.Fragment>
);

const CardContainer = () => {
  return (
    <>
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">{card}</Card>
    </Box>
  </>
  )
}

export default CardContainer


// const bull = (
//   <Box
//     component="span"
//     sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
//   >
//     •
//   </Box>
// );



