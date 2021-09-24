import axios from "axios";

/*
* Method to make request to API in context of creating a hotel
* Parameters: User toekn and form data
* @Post request
*/
export const createHotel = async (token, data) => {
  try {
    // await axios post to cereat hotel URI with form data and token in post request headers
  let hotel = await axios.post(`${process.env.REACT_APP_API}/create-hotel`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return hotel;
} catch(error) {
  // log an error to the console
  console.log(error)
}
}

/*
* Public method to get all of the hotels from the API
* @ Get Request
*/
export const readAllHotels = async () => {
  try {
    // await axios get request to hotels URI 
    let hotels= await axios.get(`${process.env.REACT_APP_API}/hotels`);
    return hotels;
  } catch (error) {
    // log an error to the console
    console.log(error)
  }
  
}

/*
* The method to calculate the number of days between the from arrival to departure
* Parameters: From and To Dates
*/
export const diffDays = (from, to) => {
  // Make a day times 24 hours by 60 mins times 60 seoconds times 10000 milseconds
  const day = 24 * 60 * 60 * 1000;
  // make a new date object with from parameter
  const start = new Date(from);
  // make new date object with to parameter
  const end = new Date(to);
  // calculate the dats inbetween from and two dates
  const difference = Math.round(Math.abs((start - end) / day));
  // return the calculation
  return difference;
};


/*
* This is the method to get the seller's hotels from API
* Parameters: User token
* @ Get Request
*/
export const sellerHotels = async (token) => {
  try {
    // await axios get method to seller hotels uri with token in headers
  let sellerHotels = await axios.get(`${process.env.REACT_APP_API}/seller-hotels`, {
  headers: {
    Authorization: `Bearer ${token}`
  },
})
return sellerHotels;
  } catch(error) {
    // log the error to the console
    console.log(error);
  }
}
/*
* This is the method to get a users hotels from the API
* Parameters: User ID
* GET Request
*/
export const profileHotels = async(userId, token) => {
  try {
    let ProfileHotels = await axios.get(`${process.env.REACT_APP_API}/profile-hotels/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
    });
    console.log(profileHotels);
    return ProfileHotels;
  } catch (error) {
    console.log(error);
    return;
  }
}
/*
* The method to send a delete hotel request to API by the seller
* Parameters: User token, HotelId
* @ Delete request
*/
export const deleteHotel = async (token, hotelId) => 
{
  try {
    // await delete response from backend to delete hotel uri with token parameter in URI and token in the request headers
    let deleteHotel = await axios.delete(`${process.env.REACT_APP_API}/delete-hotel/${hotelId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return deleteHotel
  } catch (error) {
    // log the error in the console
    console.log(error)
  }
}
/*
* The method to read a single hotel based off it's ID in the API
* Parameters: Hotel ID 
* @ Get Request
*/
export const read = async (hotelId) => {
  try{
    // await response from back end using get request using hotel uri passing the HotelID parametr in the uri
  let hotel  = await axios.get(`${process.env.REACT_APP_API}/hotel/${hotelId}`);
  return hotel;
  } catch(error) {
    // log the error in the console
    console.log(error)
  }
}

/*
* The method to send a request to the API after the seller updates a hotel listing
* Paramters: User Token, Form data, HotelId
* @ Put request
*/
  export const updateHotel = async (token, data, hotelId) => {
    try{
      // Await a response from backend when making put request with HotelID as parameter, passing the form data and using the user token in request headers
  let updateHotel =  await axios.put(`${process.env.REACT_APP_API}/update-hotel/${hotelId}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return updateHotel;
} catch(error) {
  // log the error to the console
  console.log(error);
}
/*
* Method to grab user hotel bookings based off of their id
* Parameters: User token
*/
}
export const userHotelBookings = async(token) => await axios.get(`${process.env.REACT_APP_API}/user-hotel-bookings`, {
  headers: {
    Authorization: `Bearer ${token}`,
  }
}); 
/*
* Method to see if a hotel is already booked in the API
* Parameters: User Token, Hotel ID 
* @ GET request 
*/
export const isAlreadyBooked = async(token, hotelId) => 
{
  try {
    // await a response from the backend with a get request to the already booked uri using hotelID in the parameter and user token in request headers
 let booked =  await axios.get(`${process.env.REACT_APP_API}/is-already-booked/${hotelId}`, {
  headers: {
    Authorization: `Bearer ${token}`,
  }
});
return booked;
  } catch(error) {
    // log the error to the console
    console.log(error);
  }
}
/*
* Method to search the API for hotels based off of certian parameters
* Parameters: User Query
* @ POST request 
*/
export const searchLists = async(query) => 
{
  try {
    // await response from backend when making a post request to search listings uri with query parameter
  let lists = await axios.post(`${process.env.REACT_APP_API}/search-listings`, query)
  return lists;
  } catch(error) {
    // log the error to the console
    console.log(error);
  }
}


