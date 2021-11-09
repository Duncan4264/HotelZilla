import { useState, useEffect } from "react";
import QueryString from "query-string";
import Search from "../components/forms/Search"
import { searchLists, listLocalHotels} from "../actions/hotel";
import SmallCard from "../components/cards/SmallCard";
import { useAuth0 } from '@auth0/auth0-react';


const SearchResult = () => {
    // state
    const [hotels, setHotels] = useState([]);
    const [localHotels, setLocalHotels] = useState([]);
    const {getAccessTokenSilently } = useAuth0();
 // create query string with location date and bed
 const {location, date, bed} = QueryString.parse(window.location.search);
const getToken = async () => {
    const token = await getAccessTokenSilently();
    console.log("hello");
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
    useEffect(() => {
        getToken();

        // set window location search
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <>
        <div className="container-fluid bg-secondary p-5 text-center">
        <h2>Search Results</h2>
      </div>
        {/* <div className="col">
            <br />
            <Search />
        </div> */}
        <div className="container">
            <div className="row">
                {
                    hotels.map((h) => (
                        <SmallCard key={h._id} h={h} />
                    ))
                }
            </div>
        </div>
        </>
    )
}

export default SearchResult;