import React from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AlertUser from '../components/AlertUser'

// Displays the user new booking requests for their listing
const BookingReq = ({ binfo }) => {
  const requester = binfo.owner
  const numDays = binfo.dateRange.numdays
  const startingFrom = binfo.dateRange.start
  const ending = binfo.dateRange.end
  const [showOption, setShowOption] = React.useState(true)
  const [showDone, setDone] = React.useState(false)
  const [showDeclined, setDecline] = React.useState(false)
  return (
    <>
    <Card sx={{ maxWidth: 500, background: 'rgb(211,211,211)', color: 'black', margin: 'auto' }}>
    <CardContent>
      <Typography variant="h5" component="div">
        New Booking Request !
      </Typography>
      <Typography sx={{ mb: 1.5 }}>
        {requester} wants to book property from {startingFrom} till {ending} ({numDays} days)
      </Typography>
        { showOption && <> <Button id ="AcceptBooking" variant="contained" color="success" onClick = {() => pushAccept(setDone, setShowOption, binfo.id)}> Accept </Button> &nbsp; &nbsp;
        <Button variant="contained" color="error" onClick = {() => pushDecline(setDecline, setShowOption, binfo.id)}> Decline </Button> </>}
        { showDone && <> <AlertUser sev = {'success'} mess = {'Booking Accepted'} id = {'Displayaccepted'}/> </>}
        { showDeclined && <> <AlertUser sev = {'error'} mess = {'Booking Deckined'}/> </>}
    </CardContent>
  </Card>
    </>
  )
}
BookingReq.propTypes = {
  binfo: PropTypes.any,
}

// Funciton used to push to server that the booking
// request has been accepted
// Paras setDone,setShowOption used to setStates to manipulate the UI
// id is the booking id (request id of booking)
function pushAccept (setDone, setShowOption, id) {
  const Token = localStorage.getItem('Token');
  const url1 = 'http://localhost:5005/bookings/accept/' + id
  fetch(url1, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: 'Bearer ' + Token
    },
  })
    .then(r => r.json())
    .then(data => {
      console.log(data)
      setDone(true)
      setShowOption(false)
    })
}

// Funciton used to push to server that the booking
// request has been declined
// Paras setDone,setShowOption used to setStates to manipulate the UI
// id is the booking id (request id of booking)
function pushDecline (setDecline, setShowOption, id) {
  const Token = localStorage.getItem('Token');
  const url1 = 'http://localhost:5005/bookings/decline/' + id
  fetch(url1, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: 'Bearer ' + Token
    },
  })
    .then(r => r.json())
    .then(data => {
      console.log(data)
      setDecline(true)
      setShowOption(false)
    })
}

export default BookingReq;
