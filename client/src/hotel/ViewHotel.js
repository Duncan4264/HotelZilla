import React, {useState, useEffect} from 'react'
import { diffDays, read } from "../actions/hotel"
import {useStore, useSelector} from "react-redux"
import { getSessionId } from '../actions/stripe'
import moment from "moment"

import {loadStripe } from '@stripe/stripe-js'



const ViewHotel = ({match, history}) => {
    const [hotel, setHotel] = useState("");
    const [image, setImage] = useState({});
    const [loading, setLoading] = useState(false)


    const {auth} = useSelector((state) => ({...state}))

    useEffect(() => {  
        loadSellerHotel()
    }, [])

    const loadSellerHotel = async () => {
        let res = await read(match.params.hotelId);
        
        console.log(res);

        setHotel(res.data);

        setImage(`${process.env.REACT_APP_API}/hotel/image/${res.data._id}`)
    }

    const handleClick = async (e) => {
        setLoading(true);
        e.preventDefault()
        if(!auth) history.pushState('/login')
        console.log(auth.token, match.params.hotelId);
        let res = await getSessionId(auth.token, match.params.hotelId);

        // console.log('Get session ID ', res.data.sessionId);

        const stripe = await loadStripe(process.env.REACT_APP_STRIPE_KEY)

        stripe.redirectToCheckout({
            sessionId: res.data.sessionId
        })
        .then((result) => console.log(result))
        
    }
    return (
        <>
            <div className="container-fluid bg-secondary p-5 text-center">
                <h1>{hotel.title}</h1>
            </div>
            
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6">
                        <br/>
                        <img src={image} alt={hotel.title} className="img img-fluid m-2"/>
                    </div>

                    <div className="col-md-6">
                        <br />
                        <b>{hotel.content}</b>
                        <p className="alert alert-info mt-3">{hotel.price}</p>
                        <p className="card-text">
                        <span className="float-right text-primary">
                            for {diffDays(hotel.from, hotel.to)}{" "}
                            {diffDays(hotel.from, hotel.to) <= 1 ? " day" : " days"}
                        </span>
                        </p>
                        <p>From <br/> {moment(new Date(hotel.from)).format('MMMM Do YYYY, h:mm:ss')}</p>

                        <p>
                            To <br /> {" "}
                            {moment(new Date(hotel.to)).format('MMMM do YYYY, h:mm:ss')}
                        </p>

                        <i>Posted by {hotel.postedBy && hotel.postedBy.name}</i>

                        <br />
                        <button onClick={handleClick} className="btn btn-block btn-lg btn-primary mt3" disabled={loading}>
                            {loading ? "Loading" : auth && auth.token ? 'Book Now' : 'Login to book'}
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ViewHotel