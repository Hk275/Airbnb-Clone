import React from 'react';
import PropTypes from 'prop-types';
import ListingBox from '../components/ListingBox'
import { useHistory } from 'react-router-dom';

// get listing and setter for remaing
// fetch bookings, map if listing.id == booking.lisiting.id and owner is user
// display
// if false return nothing and add to list
const ShowInvolved = (list) => {
  const [bookingList, setBookingList] = React.useState([]);
  React.useEffect(() => {
    const Token = localStorage.getItem('Token');
    fetch('http://localhost:5005/bookings', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: 'Bearer ' + Token
      },
    })
      .then(r => r.json())
      .then(data => {
        console.log(data)
        setBookingList(data.bookings)
      })
  }, [])
  // filter bookings list, where owner of booking matches the logged in user's email
  const iList = list.list
  const useremail = localStorage.getItem('Email')
  const userInvolved = bookingList.filter(el => el.owner === useremail)
  const sendBack = []

  userInvolved.map((ui) => {
    iList.map((l) => {
      if (l.id === parseInt(ui.listingId)) {
        sendBack.push(l)
      }
      return 1
    })
    return 1
  })
  // Gives us a back list of booked involvment
  const uniqueChars = [...new Set(sendBack)];
  console.log('SEnding back', uniqueChars)
  const link = '/ListingView/?id='
  const history = useHistory();
  // Now add this to view page of user invloced in listing page array_name.length;
  return (
    //  Map and Display
    uniqueChars.map((inv, idx) => {
      return (
        <div key = {idx} onClick = {() => history.push(link + inv.id)}>
         <ListingBox id = {inv.id}/>
      </div>
      )
    })
  )
}
export default ShowInvolved

ShowInvolved.propTypes = {
  list: PropTypes.any,
}
