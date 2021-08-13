import axios from 'axios';

export const createConnectionAccount = async (token) =>
  await axios.post(`${process.env.REACT_APP_API}/createStripeAccount`, {}, {
      headers: {
          Authorization: `Bearer ${token}`,
      },
  });





export const getStripeStatus = async(token) => axios.post(`${process.env.REACT_APP_API}/getAccountStatus`, {}, {
    headers: {
        Authorization: `Bearer ${token}`,
    },
});


export const getAccountBalance = async(token) => axios.post(`${process.env.REACT_APP_API}/getAccountBalance`, {}, {
    headers: {
        Authorization: `Bearer ${token}`,
    },
});

export const currencyFormatter = data => {
    return data.amount.toLocaleString(data.currency, {
      style: "currency",
      currency: data.currency
    })
  }

  export const getPayoutSettings = async(token) => axios.post(`${process.env.REACT_APP_API}/PayoutSettings`, {}, {
      
    headers: {
        Authorization: `Bearer ${token}`,
    },
    
});
