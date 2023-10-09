import React from 'react'
import { Link } from 'react-router-dom'

const SearchSuggestions = ({suggestions,handleClick}) => {
    //early return
    if(!suggestions || suggestions.length==0) return null;
    // console.log(suggestions);
    return (
        <div
            className=" absolute bg-white py-2 px-2 sm:w-[40vw] max-sm:w-full shadow-lg rounded-lg border border-gray-100 z-50" >
            <ul data-testid="sugg-list">
                {suggestions && suggestions.map((s, i) => (
                    <li key={i} className=' w-full p-2 shadow-sm hover:bg-gray-100'>
                        <Link data-testid='list-item' to={`/results?search_query=${encodeURIComponent(s).replace(/%20/g, '+')}`} onClick={() => handleClick(s)}><p className='flex gap-4 items-center'><span><svg viewBox="0 0 24 24" width="20" focusable="false"><path d="m20.87 20.17-5.59-5.59C16.35 13.35 17 11.75 17 10c0-3.87-3.13-7-7-7s-7 3.13-7 7 3.13 7 7 7c1.75 0 3.35-.65 4.58-1.71l5.59 5.59.7-.71zM10 16c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"></path></svg></span>{s}</p></Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default SearchSuggestions