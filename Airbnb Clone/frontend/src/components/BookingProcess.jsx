import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import moment from 'moment';
import Button from '@mui/material/Button';
import AlertUser from './AlertUser'

// Function process the booking request from the user
// + pushes the review of the user onto the server
const BookingProcess = ({ price, rev, prevRev }) => {
  const queryParams = new URLSearchParams(window.location.search);
  const id = queryParams.get('id');
  const [startDate, serStartDate] = React.useState('')
  const [endDate, serendDate] = React.useState('')
  const [booking, setBookingMade] = React.useState(false)
  const [bookingid, setBookingid] = React.useState(0)
  const [disable, setDisable] = React.useState(true)
  const [value, setValue] = React.useState(0);
  const [reviewText, setreviewText] = React.useState('');
  const PaperStyle = { p: 2, margin: 'auto', maxWidth: '650px', flexGrow: 1, height: 'auto', border: '2px solid black', background: 'rgb(211,211,211)' }
  const [numDays, setNumdays] = React.useState(0)
  const [TotalC, setTotalC] = React.useState(0)
  React.useEffect(() => {
    if (startDate > endDate) {
      setDisable(false)
    } else {
      // Following Day calculation taken from https://stackoverflow.com/questions/542938/how-do-i-get-the-number-of-days-between-two-dates-in-javascript
      const diffInDays = moment(endDate).diff(moment(startDate), 'days');
      setNumdays(diffInDays)
      const calc = (parseInt(diffInDays)) * parseInt(price)
      setTotalC(calc)
      setDisable(true)
    }
  }, [endDate, startDate])

  // Pushes booking dates entered by user onto the server
  // Requests a booking
  const bookingfetch = (e, numDays) => {
    e.preventDefault()

    const Token = localStorage.getItem('Token');
    const url = 'http://localhost:5005/bookings/new/' + id

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: 'Bearer ' + Token
      },
      body: JSON.stringify({
        dateRange: {
          start: startDate,
          end: endDate,
          numdays: numDays,
        },
        totalPrice: price,
      })
    })
      .then(r => r.json())
      .then(data => {
        if (data.bookingId) {
          console.log(data)
          serStartDate('')
          serendDate('')
          setBookingMade(true)
          setBookingid(data.bookingId)
          console.log(bookingid)
        }
      })
  }
  // Pushes the review entered by the user after booking
  const pushReview = (e) => {
    e.preventDefault()
    const Token = localStorage.getItem('Token')
    console.log(Token)
    const url2 = 'http://localhost:5005/listings/' + id + '/review/' + bookingid
    console.log(url2)
    fetch(url2, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: 'Bearer ' + Token,
      },
      body: JSON.stringify({
        review: {
          StarRating: value,
          Comment: reviewText,
        }
      },
      )
    })
      .then(r => r.json())
      .then(data => {
        if (!data.error) {
          rev([...prevRev, {
            StarRating: value,
            Comment: reviewText,
          }
          ]
          )
        } else {
          console.log(data)
        }
      })
      .catch((err) => console.log(err));
  }
  return (
    <>
    <Paper style = {PaperStyle} elevation = {10}>
    <form onSubmit = {(e) => bookingfetch(e, numDays) }>
    Enter Booking Start Dates: <input id = "BkDateStart" type="date" value = {startDate} onChange = {(e) => serStartDate(e.target.value)} required/>
    <br/>Enter Booking End Dates: <input id = "BkDateEnd" type = "date" value = {endDate} onChange = {(e) => serendDate(e.target.value)} required/>
    <span id = "TripCost"> Total Cost of Stay: ${TotalC} </span>
    <br/>
    {disable && <Button id= "BkMake" variant="contained" color="success"type="submit"> Make booking</Button>}
    {!disable && <> <AlertUser sev = {'error'} mess = {'Make sure Start date is before End date'} /></>}
    </form>
    { booking && <form onSubmit = {(e) => pushReview(e)}>
    <Box>
      <Typography id = "RevStar" component="legend">Rate the Listing out of 5</Typography>
      <Rating
        name="simple-controlled"
        value={value}
        required = {true}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      />
    </Box>
    Enter review: <input type="text" value = {reviewText} onChange = {(e) => setreviewText(e.target.value)} required/>
    <br/>
    <button type="submit"> Post Rating</button>
    </form> }
    </Paper>
    </>
  )
}

BookingProcess.propTypes = {
  price: PropTypes.any,
  rev: PropTypes.any,
  prevRev: PropTypes.any,
}

export default BookingProcess;
