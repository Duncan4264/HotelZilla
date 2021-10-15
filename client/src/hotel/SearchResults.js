import { useState, useEffect } from "react";
import QueryString from "query-string";
import Search from "../components/forms/Search"
import { searchLists } from "../actions/hotel";
import SmallCard from "../components/cards/SmallCard";
import { toast } from "react-toastify";
import { useHistory } from "react-router";

const SearchResult = () => {
    // state
    const [hotels, setHotels] = useState([])

    const history = useHistory();

    // constructor to loead search lists nad create query string
    useEffect(() => {
        // create query string with location date and bed
        const {location, date, bed} = QueryString.parse(window.location.search);
        
       
        // call search lists with location, date and bed parameters
        searchLists({location, date, bed}).then(res => {
            // set hotels to response data
            setHotels(res.data)

            
        });
        // set window location search
    }, [])
    return (
        <>
        <div className="container-fluid bg-secondary p-5 text-center">
        <h2>Search Results</h2>
      </div>
        <div className="col">
            <br />
            <Search />
        </div>
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