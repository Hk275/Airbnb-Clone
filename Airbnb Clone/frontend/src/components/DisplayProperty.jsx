import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import PropTypes from 'prop-types';
import { FaBath } from 'react-icons/fa';
import BedIcon from '@mui/icons-material/Bed';
import { styled } from '@mui/material/styles';

// A few styles to be placed into below properties of html
const Img = styled('img')({ margin: 'auto', display: 'block', maxWidth: '100%', maxHeight: '100%', });
const PaperStyle = { p: 2, margin: 'auto', maxWidth: '650px', flexGrow: 1, height: 'auto', border: '2px solid black', background: 'rgb(211,211,211)' }
const BtnSytle = { width: 'auto', height: 'auto', maxWidth: '600px', marginLeft: '20px', marginTop: '10px' }

// Displays the property with the appropaiat informaiton
const DisplayProperty = ({ imgsrc, tittle, numberRev, bath, beds, price }) => {
  return (
    <Paper style = {PaperStyle}>
      <Grid container spacing={2}>
        <Grid item align='center'>
          <ButtonBase style = {BtnSytle}>
            <Img alt="thumbnail of image" src={imgsrc}/>
          </ButtonBase>
          <hr/>
        </Grid>
        <Grid item container xs={5}>
          <Grid item></Grid>
          <Grid item container direction="column" spacing={1}>
            <Grid item>
              <Typography gutterBottom variant="subtitle1" component="div">
                Tittle: {tittle}
              </Typography>
              <Typography variant="body2" gutterBottom>
                Number of Reviews: {numberRev}
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="body2" gutterBottom>
              Price per Night : $ {price}
            </Typography>
          </Grid>
        </Grid>
        <Grid item container xs={5}>
          <Grid item container direction="column" spacing={1}>
            <Grid item>
              <Typography variant="body2" gutterBottom>
                <FaBath size={22}/> {bath}
              </Typography>
              <Typography variant="body2" gutterBottom>
                <BedIcon/> {beds}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default DisplayProperty;

DisplayProperty.propTypes = {
  imgsrc: PropTypes.any,
  tittle: PropTypes.any,
  numberRev: PropTypes.any,
  bath: PropTypes.any,
  beds: PropTypes.any,
  price: PropTypes.any,
}
