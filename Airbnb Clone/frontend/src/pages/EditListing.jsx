import React from 'react';
import { useHistory } from 'react-router-dom';
import { Grid, Paper, Avatar, Input, Button } from '@material-ui/core'
import ConstructionIcon from '@mui/icons-material/Construction';

// Used for the editing of an exisitng listing,
// helps the user to edit the listing using Params from the url
const EditListing = () => {
  // Extract the id from the URL
  const queryParams = new URLSearchParams(window.location.search);
  const id = queryParams.get('id');
  // Store previous Vals, if empty input use these vals
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

  // Fetch all prev vals
  React.useEffect(async () => {
    const url = 'http://localhost:5005/listings/' + id
    const r = await fetch(url)
    const data = await r.json()
    console.log(data.listing)
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
    console.log('Update Check ', data.listing)
  }, []);

  // store updated vals
  const [title, setTitle] = React.useState('');
  const [address, setaddress] = React.useState('');
  const [price, setPrice] = React.useState(0);
  const [thumbnail, setThumbnail] = React.useState('');
  const [type, setType] = React.useState('');
  const [numBathrooms, setnumBathrooms] = React.useState(0);
  const [numBedroom, setnumBedroom] = React.useState(0);
  const [numBeds, setnumBeds] = React.useState(0);
  const [TypeBeds, setTypeBeds] = React.useState('');
  const [ammen, setammen] = React.useState('');

  // push the listing after checking input, if empty replace with prev
  // val
  const pushListing = () => {
    const Token = localStorage.getItem('Token');
    const url = 'http://localhost:5005/listings/' + id
    // Check if defualt then set to prev
    if (ammen === '') {
      setammen(prevammen)
    }
    if (TypeBeds === '') {
      setTypeBeds(prevTypeBeds)
    }
    if (numBeds === 0) {
      setnumBeds(prevnumBeds)
    }
    if (numBedroom === 0) {
      setnumBedroom(prevnumBedroom)
    }
    if (title === '') {
      setTitle(prevtitle)
    }
    if (address === '') {
      setaddress(prevaddress)
    }
    if (price === 0) {
      setaddress(prevprice)
    }
    if (thumbnail === '') {
      setThumbnail(prevthumbnail)
    }
    if (type === '') {
      setType(prevtype)
    }
    if (numBathrooms === 0) {
      setnumBathrooms(prevnumBathrooms)
    }

    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: 'Bearer ' + Token
      },
      body: JSON.stringify({
        title: title,
        address: address,
        price: price,
        thumbnail: thumbnail,
        metadata: {
          Type: type,
          NumBath: numBathrooms,
          NumBedroom: numBedroom,
          NumBeds: numBeds,
          BedType: TypeBeds,
          Amenities: ammen,
        },
      })
    })
      .then(r => r.json())
      .then(data => console.log(data))
  }
  // used to change the page
  const history = useHistory();

  const change = (history) => {
    history.push('/HostedListings')
    pushListing()
  }
  const paperStyle = { padding: 20, height: 'auto', width: 'auto', maxWidth: '320px', margin: '30px auto' }
  const avatarStyle = { backgroundColor: 'rgb(246,133,37)' }
  const btnstyle = { margin: '20px 0' }

  // Below function taken from
  // https://pqina.nl/blog/convert-a-file-to-a-base64-string-with-javascript/
  function handleFileSelect (e, setThumbnail) {
    // get a reference to the file
    const file = e.target.files[0];
    // encode the file using the FileReader API
    const reader = new FileReader();
    reader.onloadend = () => {
      setThumbnail(reader.result)
    };
    reader.readAsDataURL(file);
  }

  // Once made edit go back to hosted listing screen
  return <>
    <Grid>
        <Paper elevation={10} style={paperStyle}>
            <Grid align='center'>
                 <Avatar style={avatarStyle}><ConstructionIcon/></Avatar>
                <h1>Edit Listing</h1>
                <h5>Please enter details you want to change</h5>
            </Grid>
            <form onSubmit= { () => change(history)}>
            <Input id ="ETittle" placeholder='Enter Listing Title' fullWidth value={title} onChange = {e => setTitle(e.target.value)}/>

            <Input type="number" placeholder='Price Per Night' onChange ={e => setPrice(e.target.value)} fullWidth/>
            <Input type="text" placeholder='Enter Address of Listing' value={address} onChange ={e => setaddress(e.target.value)} fullWidth/>
            <Input type="text" value={type} placeholder='Enter Type of Listing' onChange ={e => setType(e.target.value) } fullWidth/>
            <Input type="number" placeholder='Enter Number of Bedrooms' onChange ={e => setnumBedroom(e.target.value)} fullWidth/>
            <Input type="number" placeholder='Enter Number of Bathrooms' onChange ={e => setnumBathrooms(e.target.value)} fullWidth/>
            <Input type="number" placeholder='Enter Number of Beds' onChange ={e => setnumBeds(e.target.value)} fullWidth/>
            <Input type="text" placeholder='Enter Type of Beds Availible' onChange ={e => setTypeBeds(e.target.value)} fullWidth/>
            <Input type="text" placeholder='Enter Amenities Availible' onChange ={e => setammen(e.target.value)} fullWidth/>
            Upload Thumbnail of Listing: <input id="UpdateThumb" type="file" onChange = { (e) => handleFileSelect(e, setThumbnail)} />
            <Button id = "MkEdit" type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>Edit Listing</Button>
            </form>
        </Paper>
    </Grid>
   </>;
}

export default EditListing;
