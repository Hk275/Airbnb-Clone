import React from 'react';
import HL from '../components/HL'
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';
// Display all hosted listings bye user on one page
const HostedListings = () => {
  const ownerName = localStorage.getItem('Email');
  const [Alisting, setListing] = React.useState([]);
  const history = useHistory();

  React.useEffect(() => {
    fetch('http://localhost:5005/listings')
      .then(r => r.json())
      .then(data => {
        console.log(data.listings)
        const s = data.listings.filter(el => el.owner === ownerName);
        setListing(s)
      });
  }, [])
  return <>
  {Alisting.map((d, idx) => {
    return (
    <div key = {idx} id = "listing">
      <HL listingID = {d.id}/>
      <br/>
    </div>
    )
  })
  }
  <div>
  <Button onClick={() => history.push('/listings/create')} variant="contained" size="medium">Create A New Listing</Button>
  </div>
  </>;
}
export default HostedListings;
