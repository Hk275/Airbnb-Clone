import * as React from 'react';
import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';
import Rating from '@mui/material/Rating';

// A few styles have been declared before hand to use below
const PaperStyle = { p: 2, margin: 'auto', maxWidth: '650px', minHeight: '30px', flexGrow: 1, height: 'auto', border: '2px solid black', background: 'rgb(211,211,211)' }

// Displays the reviews of the listing, rev = the contents of review from the data base
const Review = (rev) => {
  return <>
   <Paper style = {PaperStyle} elevation = {10}>
    Review: {rev.Comment} &nbsp; &nbsp; &nbsp; <Rating name="read-only" value={rev.StarRating} readOnly/>
   </Paper>
   <br/>
  </>
}
export default Review;

Review.propTypes = {
  rev: PropTypes.any,
}
