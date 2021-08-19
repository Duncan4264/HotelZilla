import axios from 'axios';

export const createConnectionAccount = async (token) =>
  await axios.post(`${process.env.REACT_APP_API}/createStripeAccount`, {}, {
      headers: {
          Authorization: `Bearer ${token}`,
      },
  });





export const getStripeStatus = async(token) => await axios.post(`${process.env.REACT_APP_API}/getAccountStatus`, {}, {
    headers: {
        Authorization: `Bearer ${token}`,
    },
});


export const getAccountBalance = async(token) => await axios.post(`${process.env.REACT_APP_API}/getAccountBalance`, {}, {
    headers: {
        Authorization: `Bearer ${token}`,
    },
});

export const currencyFormatter = data => {
    return (data.amount / 100 ).toLocaleString(data.currency, {
      style: "currency",
      currency: data.currency
    })
  }

  export const getPayoutSettings = async(token) => await axios.post(`${process.env.REACT_APP_API}/PayoutSettings`, {}, {
      
    headers: {
        Authorization: `Bearer ${token}`,
    },
    
});

export const getSessionId = async(token, hotelId) => await axios.post(`${process.env.REACT_APP_API}/stripe-session-id`, {hotelId}, {
    headers: {
        Authorization: `Bearer ${token}`,
    }
}); 
