import React from 'react';
import BookingProcess from '../components/BookingProcess'
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import { styled } from '@mui/material/styles';
import Review from '../components/Review'
// Som styling for the components
const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

const PaperStyle = { p: 2, margin: 'auto', maxWidth: '650px', flexGrow: 1, height: 'auto', border: '2px solid black', background: 'rgb(211,211,211)' }
const BtnSytle = { width: 'auto', height: 'auto', maxWidth: '600px', marginLeft: '20px', marginTop: '10px' }
// When clicked on the listing box in listings view page
// it will display this, details abt the property
const ListingView = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const id = queryParams.get('id');
  const [prevtitle, setTitleprev] = React.useState('');
  const [prevaddress, setaddressprev] = React.useState('');
  const [prevprice, setPriceprev] = React.useState(0);
  const [prevthumbnail, setThumbnailprev] = React.useState('');
  const [prevtype, setTypeprev] = React.useState('');
  const [prevnumBathrooms, setnumBathroomsprev] = React.useState(0);
  const [prevnumBedroom, setnumBedroomprev] = React.useState(0);
  const [prevnumBeds, setnumBedsprev] = React.useState(0);
  const [prevTypeBeds, setTypeBedsprev] = React.useState('');
  const [prevammen, setammenprev] = React.useState('');
  const [review, setreview] = React.useState([]);

  React.useEffect(async () => {
    const url = 'http://localhost:5005/listings/' + id
    const r = await fetch(url)
    const data = await r.json()
    setTitleprev(data.listing.title)
    setaddressprev(data.listing.address)
    setPriceprev(data.listing.price)
    setThumbnailprev(data.listing.thumbnail)
    setTypeprev(data.listing.metadata.Type)
    setnumBathroomsprev(data.listing.metadata.NumBath)
    setnumBedroomprev(data.listing.metadata.NumBedroom)
    setnumBedsprev(data.listing.metadata.NumBeds)
    setTypeBedsprev(data.listing.metadata.BedType)
    setammenprev(data.listing.metadata.Amenities)
    setreview(data.listing.reviews)
    console.log(data.listing.reviews)
  }, []);
  // If logged in display booking option else dont
  const lgnstat = localStorage.getItem('Email')
  if (lgnstat === null) {
    return <>
    <Paper style = {PaperStyle}>
      <Grid container spacing={1}>
        <Grid item align='center'>
          <ButtonBase style = {BtnSytle}>
            <Img alt="thumbnail of image" src={prevthumbnail}/>
          </ButtonBase>
          <hr/>
        </Grid>
        <Grid item container xs={15} align='center' direction="column" >
          <Grid item container direction="column" spacing={1} >
            <Grid item>
              <Typography gutterBottom variant="subtitle1" component="div">
                Tittle: {prevtitle}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item container xs={6} align='center'>
          <Grid item container direction="column" spacing={1}>
            <Grid item>
              <Typography variant="body2" gutterBottom>
                Number of Beds: {prevnumBeds}
              </Typography>
            <Typography variant="body2" gutterBottom>
            Number of Bedrooms: {prevnumBedroom}
           </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item container xs={6} align='center'>
          <Grid item container direction="column" spacing={1}>
            <Grid item>
              <Typography variant="body2" gutterBottom>
                Property Type: {prevtype}
              </Typography>
              <Typography variant="body2" gutterBottom>
                Address : {prevaddress}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item container xs={6} align='center'>
          <Grid item container direction="column" spacing={1}>
            <Grid item>
              <Typography variant="body2" gutterBottom>
                Ammenties At site: {prevammen}
              </Typography>
              <Typography variant="body2" gutterBottom>
              Price per Night : $ {prevprice}
            </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item container xs={6} align='center'>
          <Grid item container direction="column" spacing={1}>
            <Grid item>
            <Typography variant="body2" gutterBottom>
                Number of Bathrooms: {prevnumBathrooms}
            </Typography>
            <Typography variant="body2" gutterBottom>
                Type of Beds : {prevTypeBeds}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
    </>
  } else {
    return <>
     <Paper style = {PaperStyle}>
      <Grid container spacing={1}>
        <Grid item align='center'>
          <ButtonBase style = {BtnSytle}>
            <Img alt="thumbnail of image" src={prevthumbnail}/>
          </ButtonBase>
          <hr/>
        </Grid>
        <Grid item container xs={15} align='center' direction="column" >
          <Grid item container direction="column" spacing={1} >
            <Grid item>
              <Typography gutterBottom variant="subtitle1" component="div">
                Tittle: {prevtitle}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item container xs={6} align='center'>
          <Grid item container direction="column" spacing={1}>
            <Grid item>
              <Typography variant="body2" gutterBottom>
                Number of Beds: {prevnumBeds}
              </Typography>
            <Typography variant="body2" gutterBottom>
            Number of Bedrooms: {prevnumBedroom}
           </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item container xs={6} align='center'>
          <Grid item container direction="column" spacing={1}>
            <Grid item>
              <Typography variant="body2" gutterBottom>
                Property Type: {prevtype}
              </Typography>
              <Typography variant="body2" gutterBottom>
                Address : {prevaddress}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item container xs={6} align='center'>
          <Grid item container direction="column" spacing={1}>
            <Grid item>
              <Typography variant="body2" gutterBottom>
                Ammenties At site: {prevammen}
              </Typography>
              <Typography variant="body2" gutterBottom>
              Price per Night : $ {prevprice}
            </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item container xs={6} align='center'>
          <Grid item container direction="column" spacing={1}>
            <Grid item>
            <Typography variant="body2" gutterBottom>
                Number of Bathrooms: {prevnumBathrooms}
            </Typography>
            <Typography variant="body2" gutterBottom>
                Type of Beds : {prevTypeBeds}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
    <br/>
    {review.map((s) => {
      return Review(s)
    })}
    <hr/>
    <BookingProcess price = {prevprice} rev = {setreview} prevRev = {review}/>
    </>
  }
}

export default ListingView;
