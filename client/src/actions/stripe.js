import axios from 'axios';
/*
* Method to send a request to the API to create a stripe connection acount
* Parameters: User Token
* @ POST request
*/
export const createConnectionAccount = async (token, userId) =>
{
  try {
    // create a post request to Stripe API to create Stripe account URI, passing User token in headers 
 let connection =  await axios.post(`${process.env.REACT_APP_API}/createStripeAccount/${userId}`, {}, {
      headers: {
          Authorization: `Bearer ${token}`,
      },
  });
  return connection;
} catch(error)  {
  // Log an error to the console
  console.log(error)
}
}
/*
* Method to get stripe status from Stripe API
* Parameters: User Token
* @ POST request
*/
export const getStripeStatus = async(token, userId) =>  {
  try {
    // Create an axios post to STRIPE API under account status URI with authorization token
 let status =  await axios.post(`${process.env.REACT_APP_API}/getAccountStatus/${userId}`, {}, {
    headers: {
        Authorization: `Bearer ${token}`,
    },
});
return status;
  } catch(error) {
    // Log an error to the console
    console.log(error)
  }
}

/*
* Method to get account balance from Stripe API
* Parameters: User Token
* @ Post request
*/
export const getAccountBalance = async(token, userId) => { 
  try {
    // Create a STRIPE API post reqeuest in get account balance uri pasing user token in headers
  let balance = await axios.post(`${process.env.REACT_APP_API}/getAccountBalance/${userId}`, {}, {
    headers: {
        Authorization: `Bearer ${token}`,
    },
});
return balance;
  } catch(error) {
    // Log and error in the console
    console.log(error)
  }
}
/*
* Method to format currentcy when handling dollar amounts
* Pameters: Currency number
*/
export const currencyFormatter = data => {
  // Return the data amount / 100 to cents with the local string with data.curreny with the stile of currency
    return (data.amount / 100 ).toLocaleString(data.currency, {
      style: "currency",
      currency: data.currency
    })
  }
/*
* Method to get Payout settings from stripe API
* Parameters: User Token
* @ POST method
*/
  export const getPayoutSettings = async(token, userId) =>  {
    try {
      // Make post request to payout settings in Stipe API  with User token in request headers
   let payout =  await axios.post(`${process.env.REACT_APP_API}/PayoutSettings/${userId}`, {}, {
    headers: {
        Authorization: `Bearer ${token}`,
      },
  });
  return payout
  } catch(error) {
    // log the error to the console
    console.log(error)
  }
}
/*
* Method to get Session ID from Stripe API
* Parameters: User Token, HotelID 
* @ POST method
*/
export const getSessionId = async (token, hotelId, userId) =>
{
  try {
    // Make a post request to API with hotelId and user token in request headers to get session Id
  let SessionId = await axios.post(
    `${process.env.REACT_APP_API}/stripe-session-id/${userId}`,
    {
      hotelId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return SessionId
  } catch(error) {
    // Log the error to the console
    console.log(error);
  }
}
/*
* Method get stripe Success method from stripe API
* Parameters: Token, HotelID
* @ POST Method
*/
export const StripeSuccessRequest = async (token, userId, hotelId) => {
  try {
    // Make axios post request to stripe success with hotel ID and user token in the headers
 let StripeSuccessRequest =  await axios.post(
    `${process.env.REACT_APP_API}/stripe-success/${userId}`,
    { hotelId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return StripeSuccessRequest;
  } catch (error) {
    // log the error to the console
    console.log(error);
  }
}

export const getLocalStripeSession = async (token, userId) => {
  try {
    // Make axios post request to stripe local with user token in the headers
 let loadStripeLocal =  await axios.post(
    `${process.env.REACT_APP_API}/stripe-local/${userId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return loadStripeLocal;
  } catch (error) {
    // log the error to the console
    console.log(error);
  }
}