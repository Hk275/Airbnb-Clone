import React from 'react';
import PropTypes from 'prop-types';
import DisplayProperty from '../components/DisplayProperty'

// Display the informaiton abt a certain listing using its id
// parameter, id = listingID
const ListingBox = ({ id }) => {
  const [published, setPublished] = React.useState(false)
  const [rev, setRev] = React.useState([])
  const [thumb, setThumb] = React.useState('')
  const [tittle, setTitle] = React.useState('')
  const [numBath, setNumBath] = React.useState('')
  const [beds, setbeds] = React.useState('')
  const [price, setPrice] = React.useState('')
  const url = 'http://localhost:5005/listings/' + id

  fetch(url)
    .then(r => r.json())
    .then(data => {
      // setRev(data.listing.reviews)
      setRev(data.listing.title)
      setThumb(data.listing.thumbnail)
      setTitle(data.listing.title)
      setPublished(data.listing.published)
      setNumBath(data.listing.metadata.NumBath)
      setbeds(data.listing.metadata.NumBeds)
      setPrice(data.listing.price)
    });
  const numReviews = rev.length
  // Display the listing if it has been published, otherwise return
  // nothing
  if (published === true) {
    return (
      <>
    <DisplayProperty imgsrc = {thumb} tittle = {tittle} numberRev = {numReviews} bath = {numBath} beds = {beds} price = {price}/>
    <br/>
    </>
    )
  } else {
    return (
      <></>
    )
  }
};

ListingBox.propTypes = {
  listings: PropTypes.any,
}

export default ListingBox;
