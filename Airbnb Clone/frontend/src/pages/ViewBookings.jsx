import React from 'react';
import BookingReq from '../components/BookingReq'
import PrevBooking from '../components/PrevBooking'

// View bookings of a paticular listing
// Uses the server, extracts the id of the listing from
// the url
const ViewBookings = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const id = queryParams.get('id');
  const [bookingList, setBookingList] = React.useState([])
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
        setBookingList(data.bookings)
      })
  }, [])

  // Filter list based on certain conditions
  const validBookings = bookingList.filter(el => el.listingId === id && el.status === 'pending')
  const doneBookings = bookingList.filter(el => el.listingId === id)
  const acceptedBooking = bookingList.filter(el => el.listingId === id && el.status === 'accepted')
  let d = 0
  let profit = 0
  for (const i in acceptedBooking) {
    d = d + acceptedBooking[i].dateRange.numdays
    profit = profit + parseInt(acceptedBooking[i].totalPrice)
  }
  // Get a list of all bookings
  // if bookings.listingid == id show it here
  const [madeLive, setMadeLive] = React.useState('')
  const availSince = () => {
    const url = 'http://localhost:5005/listings/' + id
    fetch(url)
      .then(r => r.json())
      .then(data => {
        setMadeLive(data.listing.postedOn)
      });
  }
  console.log(madeLive)
  availSince()
  return (
    <>
    {validBookings.map((book, idx) => {
      return (
        <div key = {idx}>
         <BookingReq binfo= {book}/>
         <br/>
        </div>
      )
    })}
    <PrevBooking binfo= {doneBookings} profit = {profit} days = {d}/>
    </>
  )
}

export default ViewBookings;
