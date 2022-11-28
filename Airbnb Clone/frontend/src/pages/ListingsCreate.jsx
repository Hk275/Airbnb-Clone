import React from 'react';
import { Grid, Paper, Avatar, Input, Button, Link } from '@material-ui/core'
import ConstructionIcon from '@mui/icons-material/Construction';
import { useHistory } from 'react-router-dom';
// import Alert from '@mui/material/Alert';
// import Stack from '@mui/material/Stack';
import AlertUser from '../components/AlertUser'

const ListingsCreate = () => {
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
  const [createdDone, setCreated] = React.useState(false);
  const [errormsg, setErrorMsg] = React.useState('');
  const [disError, setdisError] = React.useState(false);

  console.log(setThumbnail)
  const history = useHistory();
  const pushListing = (e) => {
    e.preventDefault()
    const Token = localStorage.getItem('Token');
    fetch('http://localhost:5005/listings/new', {
      method: 'POST',
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
      .then(data => {
        console.log(data)
        if (data.listingId) {
          setCreated(data)
        } if (data.error) {
          setdisError(true)
          setErrorMsg(data.error)
        }
      })
  }
  // Style
  const paperStyle = { padding: 20, height: 'auto', width: 'auto', maxWidth: '300px', margin: '20px auto' }
  const avatarStyle = { backgroundColor: 'rgb(246,133,37)' }
  const btnstyle = { margin: '20px 0' }

  // Below function taken from
  // https://pqina.nl/blog/convert-a-file-to-a-base64-string-with-javascript/
  function handleFileSelect (e, setThumbnail) {
    // get a reference to the file
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setThumbnail(reader.result)
    };
    reader.readAsDataURL(file);
  }
  return <>
    <Grid>
        <Paper elevation={10} style={paperStyle}>
            <Grid align='center'>
                 <Avatar style={avatarStyle}><ConstructionIcon/></Avatar>
                <h1>Create Listing</h1>
                <h5> Please enter details about the listing below </h5>
            </Grid>
            <form onSubmit= { (e) => pushListing(e)}>
            <Input id="LTittle" placeholder='Enter Listing Title' fullWidth required value={title} onChange = {e => setTitle(e.target.value)}/>
            <Input id = 'LPrice' type="number" placeholder='Price Per Night' onChange ={e => setPrice(e.target.value)} fullWidth required/>
            <Input id = 'LAddress' type="text" placeholder='Enter Address of Listing' value={address} onChange ={e => setaddress(e.target.value)} fullWidth required/>
            <Input id = 'LType' type="text" value={type} placeholder='Enter Type of Listing' onChange ={e => setType(e.target.value) } fullWidth required/>
            <Input id = 'LBedRoom' type="number" placeholder='Enter Number of Bedrooms' onChange ={e => setnumBedroom(e.target.value)} fullWidth required/>
            <Input id = 'LBathrroms' type="number" placeholder='Enter Number of Bathrooms' onChange ={e => setnumBathrooms(e.target.value)} fullWidth required/>
            <Input id = 'LBeds' type="number" placeholder='Enter Number of Beds' onChange ={e => setnumBeds(e.target.value)} fullWidth required/>
            <Input id = 'LBedType' type="text" placeholder='Enter Type of Beds Availible' onChange ={e => setTypeBeds(e.target.value)} fullWidth required/>
            <Input id = 'LAmmen' type="text" placeholder='Enter Amenities Availible' onChange ={e => setammen(e.target.value)} fullWidth required/>
            Upload Thumbnail of Listing:<input type="file" onChange={ e => { handleFileSelect(e, setThumbnail) }} required/>
            <Button id = 'Sb' type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>Create Listing</Button>
            </form>
            {createdDone && <> <AlertUser sev = {'success'} mess = {'Listing has been created'} id = { 'Success'} />
            <Link onClick = {() => history.push('/HostedListings')} >
            View all listings created by you
            </Link>
            </>}
            { disError && <> <AlertUser sev = {'error'} mess = {{ errormsg }}/>
            </> }
        </Paper>
    </Grid>
   </>;
}

export default ListingsCreate;
