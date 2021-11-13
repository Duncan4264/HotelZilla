import { useState, useEffect } from "react";
import { ReadAllHotels, readAllLocalHotels } from "../actions/hotel";
import LocalHotelSmallCard from "../components/cards/LocalHotelSmallCard";
import SmallCard from "../components/cards/SmallCard";
import Search from "../components/forms/Search";
import Carousel from 'react-bootstrap/Carousel';

/**
 * @description Renders the home componenet, along with grabbing all of the hotels and displaying edit and delete hotel if the hotel is the hotel owner
 * @author Cyrus Duncan
 * @date 16/09/2021
 * @returns {*} returns the home component
 */
const Home = () => {

  // create the state variables 
  const [hotels, setHotels] = useState([]);
  const [localHotels, setLocalHotels] = useState([]);
 // Constructor to call load all hotels method
  useEffect(() => {
    LoadAllhotels();
    LoadAllLocalHotels();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // load all hotels method to get all hotels from API
  const LoadAllhotels = async () => {
      try {
        
        // create response variable equal to reading all hotels
    let res = await ReadAllHotels();
    // set hotel state equal to response dta
    setHotels(res.data);
    console.log(res.data);
      } catch(error) {
        // log the error to the console
        console.log(error);
      }
  };
  // load all local hotels method to get all local hotels from API
  const LoadAllLocalHotels = async () => {
    try {
      // create response variable equal to reading all hotels   
    let res = await readAllLocalHotels();
    let result = res.filter(function(hotel) {
      return hotel.optimizedThumbUrls !== null && hotel.name !== null && hotel.address !== null
    });
 

    // set hotel state equal to response dta
    setLocalHotels(result);

    
    } catch(error) {  
      // log the error to the console
      console.log(error);
    }
  };

  return (
    <>
    <section>
<Carousel>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://images.unsplash.com/photo-1517840901100-8179e982acb7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
      alt="First slide"
      height="500px"
    />
    <Carousel.Caption>
    
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
      alt="Second slide"
      height="500px"
    />

    <Carousel.Caption>
  
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      alt="Third slide"
      height="500px"
    />

    <Carousel.Caption>
    
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>
</section>
      <div className="col">
      <Search />

    </div>
      <div className="container-fluid">
        <br />
        {/* { console.log(JSON.stringify(localHotels, null, 4)) } */}
        {localHotels.map((h) => (
          <>
          
          <LocalHotelSmallCard key={h._id} h={h}/>
          </>
         ))}
        {hotels.map((h) => (
          <SmallCard key={h._id} h={h}/>
        ))}
      </div>
    </>
  );
};

export default Home;
