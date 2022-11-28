import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import MakeAvail from '../components/MakeAvail'
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
// A few styles to be placed into below properties of html
const Img = styled('img')({ margin: 'auto', display: 'block', maxWidth: '100%', maxHeight: '100%', });
const l = { background: 'rgb(211,211,211)' }

// Displays a listing on the hosted listing page (HL) with additional functionality
const HL = ({ listingID }) => {
  const [tittle, settittle] = React.useState('');
  const [price, setPrce] = React.useState(0);
  const [live, setLive] = React.useState(false)
  const [thumbnail, setThumbnail] = React.useState('')
  const [type, setType] = React.useState('')
  const [numBeds, setnumBeds] = React.useState('')
  const [numBath, setnumBath] = React.useState('')
  const history = useHistory();
  const url = '/EditListing/?id='
  const [updateOption, setupdateOption] = React.useState(false)
  const [showLive, setShowLive] = React.useState(false)
  const [alreadyLive, setalreadyLive] = React.useState(false)
  const [rev, setRev] = React.useState([])
  const [starRating, setstarRating] = React.useState(0)
  const url2 = '/ViewBookings/?id='

  // Fetch the listings infomration from the server
  React.useEffect(async () => {
    const url = 'http://localhost:5005/listings/' + listingID
    const r = await fetch(url)
    const data = await r.json()
    setRev(data.listing.reviews)
    settittle(data.listing.title)
    setThumbnail(data.listing.thumbnail)
    setType(data.listing.metadata.Type)
    setnumBeds(data.listing.metadata.NumBeds)
    setnumBath(data.listing.metadata.NumBath)
    setPrce(data.listing.price)
    setLive(data.listing.published)
    let rating = 0
    for (const i in rev) {
      console.log(rev)
      rating = rating + rev[i].StarRating
    }
    // Taking the floor of the ratings
    rating = Math.floor(rating / rev.length)
    setstarRating(rating)
  }, []);

  // For manipulating the UI
  React.useEffect(() => {
  }, [updateOption, showLive, alreadyLive])
  const DelListing = () => {
    const url = 'http://localhost:5005/listings/' + listingID
    const Token = localStorage.getItem('Token');
    fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: 'Bearer ' + Token
      },
    })
      .then(r => r.json())
      .then(data => console.log(data))
  }

  // When called it unpublishes a listing
  const unpub = () => {
    setLive(false)
    const url = 'http://localhost:5005/listings/unpublish/' + listingID
    const Token = localStorage.getItem('Token');
    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: 'Bearer ' + Token
      },
    })
      .then(r => r.json())
      .then(data => console.log(data))
  }
  return (
    <Paper sx={{ p: 2, margin: 'auto', maxWidth: '650px', flexGrow: 1, height: 'auto', border: '2px solid black' }} style = {l}>
      <Grid container spacing={5}>
        <Grid item>
          <ButtonBase sx={{ maxWidth: '200px', maxHeight: '200px' }}>
            <Img alt="thumnail of property listing" src={thumbnail}/>
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={0}>
            <Grid item xs>
              <Typography gutterBottom variant="body2" component="div">
                Tittle: {tittle}
              </Typography>
              <br/>
              <Typography variant="body2" gutterBottom component="div">
                Property Type: {type}
              </Typography>
              <br/>
              <Typography variant="body2" color="text.primary" component="div">
                Number of Beds:{numBeds}
              </Typography>
              <br/>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="body2" component="div">
              Price per Night : ${price}
            </Typography>
            <br/>
            <Typography variant="body2" component="div">
              Number of Bathrooms : {numBath}
            </Typography>
            <br/>
            <Typography variant="body2" color="text.primary">
                Number of Total Reviews: {rev.length}
              </Typography>
              <Typography variant="body2" color="text.primary">
              <Rating name="read-only" value={starRating} readOnly/>
              </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid direction="rows">
        {!live && <Button id = "listingAvail" color="success" variant="contained" onClick = { () => setupdateOption(!updateOption)}> Make Listing live</Button> }
        { updateOption && <MakeAvail listingID = {listingID} showLive={setShowLive} showAvail = {setupdateOption} setAlreadylive ={setalreadyLive} dp ={setLive}/>}
        {live && <Button color="error" size="small" variant="contained" onClick = {() => unpub(setLive)}> Un-publish lISTING</Button>}
        <Grid item>
        <br/>
        </Grid>
        <Button id = "viewBook" color="info" variant="contained" onClick={() => history.push(url2 + listingID)} > View Bookings</Button>
      </Grid>
       <br/>
      <Grid item>
        <Button id = "EDIT" color="secondary" variant="contained" onClick={() => history.push(url + listingID)} >Edit Listing </Button>
        </Grid>
        <Grid item>
        <Button color="error" variant="contained" onClick={() => DelListing()} >Delete Listing</Button>
        </Grid>
    </Paper>
  )
};

HL.propTypes = {
  listingID: PropTypes.any,
}

export default HL;
