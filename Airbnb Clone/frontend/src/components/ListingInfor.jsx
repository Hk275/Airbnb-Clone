import React from 'react';
import PropTypes from 'prop-types';

const ListingInfor = (profit, days, id) => {
  const [madeLive, setMadeLive] = React.useState('')
  React.useEffect(() => {
    const url = 'http://localhost:5005/listings/' + id
    fetch(url)
      .then(r => r.json())
      .then(data => {
        setMadeLive(data.listings.postedOn)
        console.log(data.listings)
      });
  }, [])

  return (
    <div>
      Listing has been booked for {days}, owner has made ${profit}, listing was Posted on {madeLive}
    </div>
  )
}
ListingInfor.propTypes = {
  profit: PropTypes.any,
  id: PropTypes.any,
  days: PropTypes.any,
}

export default ListingInfor;
