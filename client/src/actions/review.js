import axios from 'axios';

export const create = async (token, data) => {
try {
    let review = await axios.post(`${process.env.REACT_APP_API}/create-review`, data, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    });
    return review;
} catch (error) {
    console.log(error);
}
}