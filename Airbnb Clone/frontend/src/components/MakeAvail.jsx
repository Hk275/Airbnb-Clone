import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import AlertUser from '../components/AlertUser'

// input setstate Funciton and listing ID
// change state on button submit
// make avalilibe from data input
const MakeAvail = ({ listingID, showLive, showAvail, setAlreadylive, dp }) => {
  const [startDate, setStartDate] = React.useState('');
  const [endDate, setEndDate] = React.useState('');
  const [disable, setDissable] = React.useState(true)
  React.useEffect(() => {
    if (startDate > endDate) {
      console.log('Eror')
      setDissable(false)
    } else {
      setDissable(true)
    }
  }, [endDate])
  const pushAvail = (e) => {
    e.preventDefault();
    const Token = localStorage.getItem('Token');
    const url = 'http://localhost:5005/listings/publish/' + listingID
    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: 'Bearer ' + Token
      },
      body: JSON.stringify({
        availability: [{
          isLive: true,
          start: startDate,
          end: endDate,
        }]
      },
      )
    })
      .then(r => r.json())
      .then(data => {
        if (data.error) {
          setAlreadylive(true)
        } else {
          showLive(true)
          console.log(data)
          dp(true)
        }
        showAvail(false)
      })
  }
  const checkValidDate = () => {
    setDissable(false)
  }
  console.log(checkValidDate)
  return (
  <div>
    <br/>
    <form onSubmit= {(e) => pushAvail(e)}>
     Avalilibe from: <input id = "StartDate" type="date" onChange ={e => setStartDate(e.target.value)} required/>
     Avalilibe till: <input id = "EndDate" type="date" onChange ={e => setEndDate(e.target.value)} required/>
     <br/>
     { disable && <Button id="MakeAvail" color="success" variant="contained" type= "submit" >Make Live</Button>}
     { !disable && <> <Button color="success" variant="disabled" type= "submit" >  Make Live  </Button>
     <AlertUser sev = {'error'} mess = {'Make sure Avaible till date is set after Avaible from !'} /></>}
    </form>
    <br/>
  </div>)
}

MakeAvail.propTypes = {
  listingID: PropTypes.any,
  showLive: PropTypes.any,
  showAvail: PropTypes.any,
  setAlreadylive: PropTypes.any,
  dp: PropTypes.any
}
export default MakeAvail;
