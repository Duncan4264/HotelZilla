import { useState, useEffect } from "react";
import QueryString from "query-string";
import { searchLists, listLocalHotels} from "../actions/hotel";
import SmallCard from "../components/cards/SmallCard";
import { useAuth0 } from '@auth0/auth0-react';
import LocalHotelSmallCard from "../components/cards/LocalHotelSmallCard";
import Search from "../components/forms/Search";

const SearchResult = () => {
    // state
    const [hotels, setHotels] = useState([]);
    // eslint-disable-next-line no-unused-vars
    const [localHotels, setLocalHotels] = useState([]);
    const {getAccessTokenSilently } = useAuth0();
 // create query string with location date and bed
 const {location, date, bed} = QueryString.parse(window.location.search);
const getHotels= async () => {
    const token = await getAccessTokenSilently();
            // call search lists with location, date and bed parameters
            searchLists({location, date, bed}, token).then(res => {
                // set hotels to response data
                setHotels(res.data);
            });
            listLocalHotels({location, date, bed}, token).then(res => {
                // set hotels to response data
                setLocalHotels(res.data);
            });
    
}
    // constructor to loead search lists nad create query string
    useEffect(  () => {
        try{
            const fetchData = async () => {
                const data = await getHotels();
             }
           
             fetchData();
        }catch(error){
            console.log(error);
        }
     

        // set window location search
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <>
        <div className="container-fluid bg-secondary p-5 text-center">
        <h2>Search Results</h2>
      </div>
        <div className="col">
            <Search />
        </div>
        <br/>
        <div className="container">
            <div className="row">
                {
                    hotels.map((h) => (
                        <SmallCard key={h._id} h={h} />
                    ))
                }
                {
                    localHotels.map((h) => (
                        <LocalHotelSmallCard key={h._id} h={h} />
                    ))
                }
            </div>
        </div>
        </>
    )
}

export default SearchResult;