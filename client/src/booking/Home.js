import { useState, useEffect } from "react";
import { readAllHotels } from "../actions/hotel";
import SmallCard from "../components/cards/SmallCard";
import Search from "../components/forms/Search"

/*
* Handle hotel form
*/
const Home = () => {
  // create the state variables 
  const [hotels, setHotels] = useState([]);
 // Constructor to call load all hotels method
  useEffect(() => {
    loadAllhotels();
  }, []);
  // load all hotels method to get all hotels from API
  const loadAllhotels = async () => {
      try {
        // create response variable equal to reading all hotels
    let res = await readAllHotels();
    // set hotel state equal to response dta
    setHotels(res.data);
      } catch(error) {
        // log the error to the console
        console.log(error);
      }
  };

  return (
    <>
      <div className="container-fluid bg-secondary p-5 text-center">
        <h1>All Hotels</h1>
      </div>
      <div className="col">
      <br/>
      <Search />
    </div>
      <div className="container-fluid">
        <br />
        {/* <pre>{JSON.stringify(hotels, null, 4)}</pre> */}
        {hotels.map((h) => (
          <SmallCard key={h._id} h={h}/>
        ))}
      </div>
    </>
  );
};

export default Home;
