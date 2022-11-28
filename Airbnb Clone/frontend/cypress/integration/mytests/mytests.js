context('Signup flow - happy path', () => {

  // success fully logs in, and creates a listing
  it('Successfully signs up, and create listing', () => {
    cy.visit('localhost:3000/register');
    const name = 'Jane Doe';
    const email = 'make4';
    const password = 'passw0rd';
    cy.get('[id^=Name]')
      .focus()
      .type(name);
    
    cy.get('[id^=Email]')
      .focus()
      .type(email);

    cy.get('[id^=Passowrd]')
      .focus()
      .type(password);

    cy.get('[id^=ConfirmPassowrd]')
      .focus()
      .type(password);

    cy.get('[id^=Submitbtn]')
      .click()
    // When login is a success, it takes user to create listing
    cy.url().should('include', '/listings/create')
    
    const tittle = 'UI Test Listing'
    const Price = 25
    const Address = 'UNSW Randwirck Aprt 4'
    const type = "Apartment"
    const Bedroom = 3
    const Bathroom = 4
    const beds = 2
    const BedType = "King Size"
    const Ammen = "Jacuzi"

  
  cy.get('[id^=LBedType]')
    .focus()
    .type(BedType);

  cy.get('[id^=LAmmen]')
    .focus()
    .type(Ammen);


  cy.get('[id^=LBathrroms]')
    .focus()
    .type(Bathroom);

  cy.get('[id^=LBeds]')
    .focus()
    .type(beds);


  cy.get('[id^=LType]')
    .focus()
    .type(type);

  cy.get('[id^=LBedRoom]')
    .focus()
    .type(Bedroom);

    // Add title 
    cy.get('[id^=LTittle]')
      .focus()
      .type(tittle);

    // Add price
    cy.get('[id^=LPrice]')
      .focus()
      .type(Price);

    cy.get('[id^=LAddress]')
      .focus()
      .type(Address);

      const filepath = 'images/test.png'
      cy.get('input[type="file"]').attachFile(filepath)

    cy.get('[id^=Sb]').click()

      cy.get('[id^=Success]').contains('created')
  });

  it('Login and Make Listing Live then Logout', () => {
    cy.visit('localhost:3000/login');
    const email = 'make4';
    const password = 'passw0rd';

    cy.get('[id^=userName]')
      .focus()
      .type(email);

    cy.get('[id^=pass]')
      .focus()
      .type(password);
    
    cy.get('[id^=login]')
      .click()
   
    
    cy.url().should('include', '/HostedListings')
    // Making sure listing is there 
    cy.get('[id^=listing]').contains('UI Test Listing')
    cy.get('[id^=listingAvail]').click()
    // Make listing live 
    cy.get('[id^=StartDate]').focus().type('2021-11-01')
    cy.get('[id^=EndDate]').focus().type('2021-11-10')
    cy.get('[id^=MakeAvail]').click()
    // Make sure listing is live
    cy.get('[id^="EDIT"]').contains('Edit Listing')
    // Log user out 
    cy.get('[id^=logout]').click()
  })

  it('Successfully signs up new user', () => {

    cy.visit('localhost:3000/register');
    const name = 'Booker';
    const email = 'Mewantbook';
    const password = 'passw0rd';
    cy.get('[id^=Name]')
      .focus()
      .type(name);
    
    cy.get('[id^=Email]')
      .focus()
      .type(email);

    cy.get('[id^=Passowrd]')
      .focus()
      .type(password);

    cy.get('[id^=ConfirmPassowrd]')
      .focus()
      .type(password);

    cy.get('[id^=Submitbtn]')
      .click()
    // When login is a success, it takes user to create listing
    cy.url().should('include', '/listings/create')
  })

  // Using new user sign in, and make booking 
  it('New User logs in and makes a booking', () => {
    cy.visit('localhost:3000/login');
    const email = 'Mewantbook';
    const password = 'passw0rd';
  
      cy.get('[id^=userName]')
        .focus()
        .type(email);
  
      cy.get('[id^=pass]')
        .focus()
        .type(password);
      
      cy.get('[id^=login]')
        .click()
      cy.get('[id^=viewListing]').click()
      // Make sure the listing is there 
      cy.get('[id^=Listbox]').contains('UI Test Listing')

      cy.get('[id^=Listbox]').click()
      // making sure path exists with id of listing
      cy.url().should('include', '/ListingView/?id=')
      cy.get('[id^=BkDateStart]').focus().type('2021-11-01')
      cy.get('[id^=BkDateEnd]').focus().type('2021-11-10')
      // Get trip cost = numdays * price per night
      cy.get('[id^=TripCost]').contains('Total Cost of Stay: $225')
      cy.get('[id^=BkMake]').click()
      // Once booking made review options should be made availbe
      cy.get('[id^=RevStar]').contains('Rate the Listing out of 5')
  })
  it('Host signs in and accepts request from user and edits listing', () => {
    cy.visit('localhost:3000/login');
    const email = 'make4';
    const password = 'passw0rd';
    cy.get('[id^=userName]')
        .focus()
        .type(email);
  
      cy.get('[id^=pass]')
        .focus()
        .type(password);
      
      cy.get('[id^=login]')
        .click()
      cy.get('[id^=EDIT]').click()

      cy.url().should('include', '/EditListing/?id')

      const updTit = "New Testing Title"
      cy.get('[id^=ETittle]')
      .focus()
      .type(updTit);
      // New File
      const filepath = 'images/new.png'

      cy.get('input[type="file"]').attachFile(filepath)
      cy.get('[id^=MkEdit]').click()

      cy.url().should('include', '/HostedListings')

      cy.get('[id^=viewBook]').click()
      cy.url().should('include', 'ViewBookings/?id=')
      // Accept the booking
      cy.get('[id^=AcceptBooking]').click()
      // Displays accpetance
      cy.get('[id^=Displayaccepted]').contains('Booking Accepted')
  })
});
