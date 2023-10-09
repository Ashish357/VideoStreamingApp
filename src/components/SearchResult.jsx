import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom';
import { YOUTUBE_VIDEOS_BY_CATEGORY } from '../utils/constants';
import SearchResultCard from './SearchResultCard';
import { useSelector } from 'react-redux';

const SearchResult = () => {
    const [searchResults, setSearchResults] = useState(null);
    const [searchParams] = useSearchParams();
    const searchText = searchParams.get("search_query");

    const isMenuOpen = useSelector(store => store.app.isMenuOpen);

    useEffect(() => {
        if (searchText !== '') {
            getSearchResults();
        }
    }, [searchText])

    const getSearchResults = async () => {
        const data = await fetch(YOUTUBE_VIDEOS_BY_CATEGORY + searchText);
        const json = await data.json();
        // console.log(json.items);
        setSearchResults(json.items);
        // console.log(searchResults[0])
    }
    // console.log(searchResults);
    // console.log("rendering...");
    return (
        <div className={`${isMenuOpen ? 'max-sm:fixed':'max-sm:static mx-2 md:mx-12 my-6'}`}>
            { searchResults && 
                searchResults.map((video) => (
                    <div key={video.id.videoId} data-testid='search-results' className='mb-2 w-full'>
                    <Link to={"/watch?v=" + video.id?.videoId}>
                        <SearchResultCard info={video} />
                    </Link>
                    </div>
                ))
            }
        </div>
    )
}

export default SearchResult