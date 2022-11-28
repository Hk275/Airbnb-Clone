import React from 'react';
import ListingBox from '../components/ListingBox'
import { useHistory } from 'react-router-dom';
import ShowInvolved from '../pages/ShowInvolved'

const ListingsList = () => {
  const [listing, setListing] = React.useState([]);
  // const [filterList, addtoList] = React.useState([])
  // const [eprice, esetPrce] = React.useState(0);
  // const [etittle, esettittle] = React.useState('');
  // console.log(etittle, eprice)
  const history = useHistory();
  // Add list for all
  React.useEffect(() => {
    fetch('http://localhost:5005/listings')
      .then(r => r.json())
      .then(data => {
        setListing(data.listings)
        console.log(data.listings)
      });
  }, [])
  const useremail = localStorage.getItem('Email')
  console.log(useremail)
  const s = []
  console.log('===', s)
  // const fi = (idList, filterTittle, minfilterprice, e, filterList, esettittle, maxfilterprice, addtoList) => {
  //   e.preventDefault();
  //   idList.map((l) => {
  //     const b = checkFilter(l, filterTittle, minfilterprice, filterList, esettittle, maxfilterprice, addtoList)
  //     console.log('IISIID================', b)
  //     return 1
  //   })
  // }

  // function checkFilter (id, filterTittle, minfilterprice, filterList, esettittle, maxfilterprice, addtoList) {
  //   console.log('====', filterTittle)
  //   console.log(minfilterprice)
  //   const url = 'http://localhost:5005/listings/' + id
  //   fetch(url)
  //     .then(r => r.json())
  //     .then(data => {
  //       console.log(data)
  //       esettittle(data.listing.title)
  //       console.log(data.listing.title)
  //       esetPrce(data.listing.price)
  //       console.log(data.listing.price)
  //       if (data.listing.title.toUpperCase().startsWith(filterTittle.toUpperCase()) && (data.listing.price >= minfilterprice && data.listing.price <= maxfilterprice)
  //       ) {
  //         addtoList([...filterList, id])
  //         return (id)
  //       }
  //     })
  // console.log('============', etittle)
  // const tName = etittle.toUpperCase()
  // if (tName.startsWith(filterTittle.toUpperCase() && parseInt(eprice) <= minfilterprice)) {
  //   addtoList(id)
  // }
  // Make list of all listing tittles
  // sort that list = tittlesort
  // once sorted we will use that list make new list named sList
  // for i in tittlesort
  //    for j in listing
  //        if tittlesort[i] === listing[j].tittle
  //              sList.push (listing[j]
  const tittlelist = []
  listing.map((list) => {
    // preventing wrong .sort() by making all uppercase
    tittlelist.push(list.title.toUpperCase())
    return 1
  }
  )
  const sortedListings = []
  tittlelist.sort()
  for (const i in tittlelist) {
    listing.map((list) => {
      const name = list.title
      // In case first letter of some titles are lower case
      // list sort will be wrong
      if (tittlelist[i] === name.toUpperCase()) {
        sortedListings.push(list)
      }
      return 1
    })
  }
  // const [filterTittle, setfilterTittle] = React.useState('');
  // const [minfilterprice, setminfilterprice] = React.useState(0)
  // // assigning a large max price
  // const [maxfilterprice, setMaxFilterprice] = React.useState(1000000000)

  const allId = []
  // console.log(filterList)
  listing.map((l) => {
    allId.push(l.id)
    return 1
  })

  const link = '/ListingView/?id='
  console.log(sortedListings)
  // console.log(reSort)
  // df
  return <>
  {useremail && <> <h3>Current Listings you are involved in </h3>  <ShowInvolved list = {sortedListings}/> <hr/></>}
  <h3>All Listings</h3>
  {sortedListings.map((listings, idx) => {
    return (
    <div id = "Listbox" key = {idx} onClick = {() => history.push(link + listings.id)}>
      <ListingBox id = {listings.id}/>
    </div>
    )
  })
  }
  </>;
}
// onClick = {() => console.log('Hi')}
export default ListingsList;

// Get a list of all id and filters
// for each id fetch get details of property from another function
// if filters match then add to list using react.usestate

// function checkAvail (id, reSort, setreSort) {
//   const url = 'http://localhost:5005/listings/' + id
//   fetch(url)
//     .then(r => r.json())
//     .then(data => {
//       setreSort([...reSort, data.listing.published])
//     });
// }
