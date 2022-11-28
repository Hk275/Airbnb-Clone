import React, { useEffect } from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import './App.css';
import ListingsList from './pages/ListingsList'
import ListingsCreate from './pages/ListingsCreate'
import LoginPage from './pages/LoginPage'
import StoreProvider from './utils/Store'
import RegisterPage from './pages/RegisterPage'
import LogoutButton from './components/LogoutButton'
import HostedListings from './pages/HostedListings'
import EditListing from './pages/EditListing'
import ListingView from './pages/ListingView'
import ViewBookings from './pages/ViewBookings'
import DisplayProperty from './components/DisplayProperty'

function App () {
  const [loggedIn, setloggedIn] = React.useState('False');
  useEffect(() => {
  }, [loggedIn])
  const s = Pages(loggedIn, setloggedIn)
  return s
}

// Display loggedin Pages or Logged Out pages
const Pages = (status, fnc) => {
  // User needs to log in
  if (status === 'False') {
    return (
      <>
      <StoreProvider>
      <Router>
          <Link to='/'>All Listing</Link>&nbsp;|&nbsp;
          <Link to ='/login'><button>Login</button></Link> &nbsp;|&nbsp;
          <Link to ='/register'><button>Register</button></Link>
        <hr />
        <Switch>
          <Route exact path="/">
            <ListingsList/>
          </Route>
          <Route path="/listings/create">
            <ListingsCreate/>
          </Route>
          <Route path="/login">
            <LoginPage setter = {fnc} />
          </Route>
          <Route path="/register" >
            <RegisterPage setter = {fnc}/>
          </Route>
          <Route path="/ListingView">
            <ListingView/>
          </Route>
          <Route path="/DisplayProperty">
            <DisplayProperty/>
          </Route>
        </Switch>
      </Router>
      </StoreProvider>
      </>
    );
    // If user is logged in
  } if (status === 'True') {
    return (
      <>
      <Router>
          <Link id = "viewListing" to='/'>All Listing</Link>&nbsp;|&nbsp;
          <Link to='/listings/create'>Listing Create</Link> &nbsp;|&nbsp;
          <Link id = "Hosted" to='/HostedListings'> Hosted Listings Screen</Link> &nbsp;|&nbsp;
          <LogoutButton setter = {fnc}/>
        <hr />
        <Switch>
          <Route exact path="/">
            <ListingsList/>
          </Route>
          <Route path="/listings/create">
            <ListingsCreate/>
          </Route>   d
          <Route path="/HostedListings">
            <HostedListings/>
          </Route>
          <Route path="/EditListing">
            <EditListing/>
          </Route>
          <Route path="/ListingView">
            <ListingView/>
          </Route>
          <Route path="/ViewBookings">
            <ViewBookings/>
          </Route>
        </Switch>
      </Router>
     </>
    );
  }
}

export default App;
