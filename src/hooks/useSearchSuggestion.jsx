import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { cacheResults } from '../utils/searchSlice';
import { YOUTUBE_SEARCH_SUGGESTION_API } from '../utils/constants';

const useSearchSuggestion = (searchQuery) => {
    const [suggestions, setSuggestions] = useState([]);
    const dispatch = useDispatch();
    const searchCache = useSelector((store) => store.search)

    useEffect(() => {
        //by using setTimeout achieved the functionality of debouncing to further reduce api call
        //used data structure to store the results in key:value form using redux
        const timer = setTimeout(() => {
            if (searchCache[searchQuery]) {
                setSuggestions(searchCache[searchQuery]);
            }
            else {
                showSearchSuggestion()
            }
        }, 200);
        return () => {
            clearTimeout(timer);
        }
    }, [searchQuery]);

    const showSearchSuggestion = async () => {
        const data = await fetch(YOUTUBE_SEARCH_SUGGESTION_API + searchQuery);
        const json = await data.json();
        // console.log(json[1]);
        setSuggestions(json[1]);
        //to push it in store
        dispatch(cacheResults({
            [searchQuery]: json[1]
        }))
    }
  return {suggestions};
}

export default useSearchSuggestion