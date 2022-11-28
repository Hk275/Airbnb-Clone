import React from 'react';
import PropTypes from 'prop-types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

// Displays all the relevant infomation regarding previous listings as a table
// binfo = bookings info list, profit = total profit the listing has made
// days = number of days the listing has been booked
const PrevBooking = ({ binfo, profit, days }) => {
  return (
    <>
<TableContainer component={Paper} sx={ { maxWidth: 700, margin: 'auto', border: 1 } }>
<Table aria-label="caption table">
  <caption>This listing has made a profit of ${profit}, and has been booked for {days} days this year.</caption>
  <TableHead>
    <TableRow>
      <TableCell>Previous Booking Request ID</TableCell>
      <TableCell>From</TableCell>
      <TableCell>Status of Booking</TableCell>
      <TableCell>Booking Price (Per Night)</TableCell>
      <TableCell>Number of Days</TableCell>
    </TableRow>
  </TableHead>
  <TableBody>
    {binfo.map((b) => (
      <TableRow key={b.id}>
        <TableCell component="th" scope="row" >
          {b.id}
        </TableCell>
        <TableCell>{b.owner}</TableCell>
        <TableCell>{b.status}</TableCell>
        <TableCell>${b.totalPrice}</TableCell>
        <TableCell>{b.dateRange.numdays}</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
</TableContainer>
    </>
  )
}
export default PrevBooking;

PrevBooking.propTypes = {
  binfo: PropTypes.any,
  profit: PropTypes.any,
  days: PropTypes.any
}
