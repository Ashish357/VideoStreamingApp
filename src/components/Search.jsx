import React, { useState } from 'react'
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import useSearchSuggestion from '../hooks/useSearchSuggestion';
import SearchSuggestions from './SearchSuggestions';


const Search = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);//make this true when testing

    const navigate = useNavigate();
    const { suggestions } = useSearchSuggestion(searchQuery)
    // const [searchParams] = useSearchParams();
    // const searchText = searchParams.get("search_query");
    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log("Navigate");
        navigate(`/results?search_query=${encodeURIComponent(searchQuery)}`);
        setShowSuggestions(false);
    }

    const handleClick = (suggestion) => {
        // console.log("clicked");
        setSearchQuery(suggestion)
        setShowSuggestions(false);
    };

    return (
        <>
            <form onSubmit={(e) => handleSubmit(e)} className='flex justify-center items-center'>
                <input
                    data-testid='search-input'
                    type="text" className='border border-gray-400 rounded-l-full py-1.5 px-4 sm:w-[40vw] max-sm:w-full'
                    // placeholder='Search'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setShowSuggestions(true)}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                />
                <button data-testid="search-btn" className='border border-gray-400 rounded-r-full py-1.5 px-5 bg-gray-100'><svg viewBox="0 0 24 24" width="24" focusable="false"><path d="m20.87 20.17-5.59-5.59C16.35 13.35 17 11.75 17 10c0-3.87-3.13-7-7-7s-7 3.13-7 7 3.13 7 7 7c1.75 0 3.35-.65 4.58-1.71l5.59 5.59.7-.71zM10 16c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"></path></svg></button>
            </form>
            {(showSuggestions && searchQuery !== '') && (
                <SearchSuggestions suggestions={suggestions} handleClick={handleClick} />
            )}
        </>
    )
}

export default Search