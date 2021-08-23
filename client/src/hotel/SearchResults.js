import { useState, useEffect } from "react";
import QueryString from "query-string";
import { Link } from "react-router-dom";
import Search from "../components/forms/Search"
import { searchLists } from "../actions/hotel";
import SmallCard from "../components/cards/SmallCard";

const SearchResult = () => {
    // state
    const [searchLocation, setSearchLocaiton] = useState('')
    const [searchDate, setSearchDate] = useState('')
    const [searchBed, setSearchBed] = useState('')
    const [hotels, setHotels] = useState([])

    useEffect(() => {
        const {location, date, bed} = QueryString.parse(window.location.search)

        searchLists({location, date, bed}).then(res => {
            console.log('SEARCH RESULTS ====> ', res.data);
            setHotels(res.data)
        })
    }, [window.location.search])
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