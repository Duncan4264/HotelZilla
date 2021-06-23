import axios from 'axios';

export const createConnectionAccount = async (token) =>
  await axios.post(`${process.env.REACT_APP_API}/createStripeAccount`, {}, {
      headers: {
          Authorization: `Bearer ${token}`,
      },
  });

