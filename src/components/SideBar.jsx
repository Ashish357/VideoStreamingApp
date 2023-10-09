import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import store from '../utils/store'
// import { MdHistory } from "react-icons/md";
import { Link } from 'react-router-dom';

const SideBar = () => {
    const isMenuOpen = useSelector(store => store.app.isMenuOpen);
    const [activeButton, setActiveButton] = useState('Home'); // Initialize with the default active button

    const handleButtonClick = (buttonName) => {
        setActiveButton(buttonName);
    };
    //Early return pattern
    // if(!isMenuOpen) return null;
    // console.log("sidebar");
    return (
        <>
            {isMenuOpen &&
                <div data-testid="sidebar" className='p-3 shadow-lg z-30 bg-white max-md:h-[93vh]'>
                    <div className='overflow-hidden overflow-y-scroll  md:max-h-[calc(100vh-80px)]'>
                        <ul data-testid="sidebar-1" className='w-52'>
                            <Link to='/'>
                                <li
                                    className={`flex h-10 text-sm px-3 cursor-pointer items-center hover:bg-slate-200 rounded-xl ${activeButton === 'Home' ? 'bg-slate-200' : ''
                                        }`}
                                    onClick={() => handleButtonClick('Home')}
                                ><div className='mr-6'><svg height="24" viewBox="0 0 24 24" width="24" focusable="false" ><g><path d="M4 21V10.08l8-6.96 8 6.96V21h-6v-6h-4v6H4z"></path></g></svg></div> Home</li>
                            </Link>
                            <Link to={`/results?search_query=${encodeURIComponent("Shorts")}`}>
                                <li
                                    className={`flex h-10 text-sm px-3 cursor-pointer items-center hover:bg-slate-200 rounded-xl ${activeButton === 'Shorts' ? 'bg-slate-200' : ''
                                        }`}
                                    onClick={() => handleButtonClick('Shorts')}
                                ><div className='mr-6'><svg height="24" viewBox="0 0 24 24" width="24" focusable="false"><path d="M10 14.65v-5.3L15 12l-5 2.65zm7.77-4.33-1.2-.5L18 9.06c1.84-.96 2.53-3.23 1.56-5.06s-3.24-2.53-5.07-1.56L6 6.94c-1.29.68-2.07 2.04-2 3.49.07 1.42.93 2.67 2.22 3.25.03.01 1.2.5 1.2.5L6 14.93c-1.83.97-2.53 3.24-1.56 5.07.97 1.83 3.24 2.53 5.07 1.56l8.5-4.5c1.29-.68 2.06-2.04 1.99-3.49-.07-1.42-.94-2.68-2.23-3.25zm-.23 5.86-8.5 4.5c-1.34.71-3.01.2-3.72-1.14-.71-1.34-.2-3.01 1.14-3.72l2.04-1.08v-1.21l-.69-.28-1.11-.46c-.99-.41-1.65-1.35-1.7-2.41-.05-1.06.52-2.06 1.46-2.56l8.5-4.5c1.34-.71 3.01-.2 3.72 1.14.71 1.34.2 3.01-1.14 3.72L15.5 9.26v1.21l1.8.74c.99.41 1.65 1.35 1.7 2.41.05 1.06-.52 2.06-1.46 2.56z"></path></svg></div>Shorts</li>
                            </Link>
                            <li
                                className={`flex h-10 text-sm px-3 cursor-pointer items-center hover:bg-slate-200 rounded-xl ${activeButton === 'Subscription' ? 'bg-slate-200' : ''
                                    }`}
                                onClick={() => handleButtonClick('Subscription')}
                            ><div className='mr-6'><svg height="24" viewBox="0 0 24 24" width="24" focusable="false"><path d="M10 18v-6l5 3-5 3zm7-15H7v1h10V3zm3 3H4v1h16V6zm2 3H2v12h20V9zM3 10h18v10H3V10z"></path></svg></div>Subscription</li>
                        </ul>
                        <ul data-testid="sidebar-2" className='w-52 mt-3 pt-3 border-t border-gray-200'>
                            <li
                                className={`flex h-10 text-sm px-3 cursor-pointer items-center hover:bg-slate-200 rounded-xl ${activeButton === 'Library' ? 'bg-slate-200' : ''
                                    }`}
                                onClick={() => handleButtonClick('Library')}
                            ><div className='mr-6'><svg height="24" viewBox="0 0 24 24" width="24" focusable="false"><path d="m11 7 6 3.5-6 3.5V7zm7 13H4V6H3v15h15v-1zm3-2H6V3h15v15zM7 17h13V4H7v13z"></path></svg></div> Library</li>
                            <li
                                className={`flex h-10 text-sm px-3 cursor-pointer items-center hover:bg-slate-200 rounded-xl ${activeButton === 'History' ? 'bg-slate-200' : ''
                                    }`}
                                onClick={() => handleButtonClick('History')}
                            ><div className='mr-6'><svg height="24" viewBox="0 0 24 24" width="24" focusable="false"><g><path d="M14.97 16.95 10 13.87V7h2v5.76l4.03 2.49-1.06 1.7zM22 12c0 5.51-4.49 10-10 10S2 17.51 2 12h1c0 4.96 4.04 9 9 9s9-4.04 9-9-4.04-9-9-9C8.81 3 5.92 4.64 4.28 7.38c-.11.18-.22.37-.31.56L3.94 8H8v1H1.96V3h1v4.74c.04-.09.07-.17.11-.25.11-.22.23-.42.35-.63C5.22 3.86 8.51 2 12 2c5.51 0 10 4.49 10 10z"></path></g></svg></div> History</li>
                            <li
                                className={`flex h-10 text-sm px-3 cursor-pointer items-center hover:bg-slate-200 rounded-xl ${activeButton === 'Your Videos' ? 'bg-slate-200' : ''
                                    }`}
                                onClick={() => handleButtonClick('Your Videos')}
                            ><div className='mr-6'><svg height="24" viewBox="0 0 24 24" width="24" focusable="false"><path d="m10 8 6 4-6 4V8zm11-5v18H3V3h18zm-1 1H4v16h16V4z"></path></svg></div> Your Videos</li>
                            <li
                                className={`flex h-10 text-sm px-3 cursor-pointer items-center hover:bg-slate-200 rounded-xl ${activeButton === 'Watch Later' ? 'bg-slate-200' : ''
                                    }`}
                                onClick={() => handleButtonClick('Watch Later')}
                            ><div className='mr-6'><svg height="24" viewBox="0 0 24 24" width="24" focusable="false"><path d="M14.97 16.95 10 13.87V7h2v5.76l4.03 2.49-1.06 1.7zM12 3c-4.96 0-9 4.04-9 9s4.04 9 9 9 9-4.04 9-9-4.04-9-9-9m0-1c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2z"></path></svg></div> Watch later</li>
                            <li
                                className={`flex h-10 text-sm px-3 cursor-pointer items-center hover:bg-slate-200 rounded-xl ${activeButton === 'Your Clips' ? 'bg-slate-200' : ''
                                    }`}
                                onClick={() => handleButtonClick('Your Clips')}
                            ><div className='mr-6'><svg height="24" viewBox="0 0 24 24" width="24" focusable="false"><path d="M8 7c0 .55-.45 1-1 1s-1-.45-1-1 .45-1 1-1 1 .45 1 1zm-1 9c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm3.79-7.77L21 18.44V20h-3.27l-5.76-5.76-1.27 1.27c.19.46.3.96.3 1.49 0 2.21-1.79 4-4 4s-4-1.79-4-4 1.79-4 4-4c.42 0 .81.08 1.19.2l1.37-1.37-1.11-1.11C8 10.89 7.51 11 7 11c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4c0 .43-.09.84-.21 1.23zm-.71.71-.43-.44.19-.58c.11-.34.16-.64.16-.92 0-1.65-1.35-3-3-3S4 5.35 4 7s1.35 3 3 3c.36 0 .73-.07 1.09-.21l.61-.24.46.46 1.11 1.11.71.71-.71.71-1.37 1.37-.43.43-.58-.18C7.55 14.05 7.27 14 7 14c-1.65 0-3 1.35-3 3s1.35 3 3 3 3-1.35 3-3c0-.38-.07-.75-.22-1.12l-.25-.61.47-.47 1.27-1.27.71-.71.71.71L18.15 19H20v-.15l-9.92-9.91zM17.73 4H21v1.56l-5.52 5.52-2.41-2.41L17.73 4zm.42 1-3.67 3.67 1 1L20 5.15V5h-1.85z"></path></svg></div> Your clips</li>
                        </ul>
                        <h1 className='text-base font-normal pt-2 pb-2 px-3 border-t border-gray-200'>Explore</h1>
                        <ul data-testid="sidebar-3" className='w-52'>
                            <Link to='/'>
                                <li
                                    className={`flex h-10 text-sm px-3 cursor-pointer items-center hover:bg-slate-200 rounded-xl ${activeButton === 'Trending' ? 'bg-slate-200' : ''
                                        }`}
                                    onClick={() => handleButtonClick('Trending')}
                                ><div className='mr-6'><svg height="24" viewBox="0 0 24 24" width="24" focusable="false"><path d="M19 3.87v9.77C19 17.7 15.86 21 12 21s-7-3.3-7-7.37v-.13c0-1.06.22-2.13.62-3.09.5-1.19 1.29-2.21 2.27-2.97.85-.66 1.83-1.14 2.87-1.65.39-.19.77-.38 1.15-.58.36-.19.72-.38 1.08-.56v3.22l1.55-1.04L19 3.87M20 2l-6 4V3c-.85.44-1.7.88-2.55 1.33-1.41.74-2.9 1.34-4.17 2.32-1.13.87-2.02 2.05-2.58 3.37-.46 1.09-.7 2.29-.7 3.48v.14C4 18.26 7.58 22 12 22s8-3.74 8-8.36V2zM9.45 12.89 14 10v5.7c0 1.82-1.34 3.3-3 3.3s-3-1.47-3-3.3c0-1.19.58-2.23 1.45-2.81z"></path></svg></div> Trending</li>
                            </Link>
                            <Link to={`/results?search_query=${encodeURIComponent("Shopping")}`}>
                                <li
                                    className={`flex h-10 text-sm px-3 cursor-pointer items-center hover:bg-slate-200 rounded-xl ${activeButton === 'Shopping' ? 'bg-slate-200' : ''
                                        }`}
                                    onClick={() => handleButtonClick('Shopping')}
                                ><div className='mr-6'><svg height="24" viewBox="0 0 24 24" width="24" focusable="false"><path d="M7 8c0 2.76 2.24 5 5 5s5-2.24 5-5h-1c0 2.21-1.79 4-4 4s-4-1.79-4-4H7zm9.9-2c-.46-2.28-2.48-4-4.9-4S7.56 3.72 7.1 6H4v14c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V6h-3.1zM12 3c1.86 0 3.43 1.27 3.87 3H8.13c.44-1.73 2.01-3 3.87-3zm7 17c0 .55-.45 1-1 1H6c-.55 0-1-.45-1-1V7h14v13z"></path></svg></div> Shopping</li>
                            </Link>
                            <Link to={`/results?search_query=${encodeURIComponent("Music")}`}>
                                <li
                                    className={`flex h-10 text-sm px-3 cursor-pointer items-center hover:bg-slate-200 rounded-xl ${activeButton === 'Music' ? 'bg-slate-200' : ''
                                        }`}
                                    onClick={() => handleButtonClick('Music')}
                                ><div className='mr-6'><svg height="24" viewBox="0 0 24 24" width="24" focusable="false"><path d="M12 4v9.38c-.73-.84-1.8-1.38-3-1.38-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V8h6V4h-7zM9 19c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm9-12h-5V5h5v2z"></path></svg></div> Music</li>
                            </Link>
                            <Link to={`/results?search_query=${encodeURIComponent("Movies")}`}>
                                <li
                                    className={`flex h-10 text-sm px-3 cursor-pointer items-center hover:bg-slate-200 rounded-xl ${activeButton === 'Movies' ? 'bg-slate-200' : ''
                                        }`}
                                    onClick={() => handleButtonClick('Movies')}
                                ><div className='mr-6'><svg height="24" viewBox="0 0 24 24" width="24" focusable="false"><path d="m22.01 4.91-.5-2.96L1.64 5.19 2 8v13h20V8H3.06l18.95-3.09zM5 9l1 3h3L8 9h2l1 3h3l-1-3h2l1 3h3l-1-3h3v11H3V9h2z"></path></svg></div> Movies</li>
                            </Link>
                            <Link>
                                <li
                                    className={`flex h-10 text-sm px-3 cursor-pointer items-center hover:bg-slate-200 rounded-xl ${activeButton === 'Live' ? 'bg-slate-200' : ''
                                        }`}
                                    onClick={() => handleButtonClick('Live')}
                                ><div className='mr-6'><svg height="24" viewBox="0 0 24 24" width="24" focusable="false"><g><path d="M14 12c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zM8.48 8.45l-.71-.7C6.68 8.83 6 10.34 6 12s.68 3.17 1.77 4.25l.71-.71C7.57 14.64 7 13.39 7 12s.57-2.64 1.48-3.55zm7.75-.7-.71.71c.91.9 1.48 2.15 1.48 3.54s-.57 2.64-1.48 3.55l.71.71C17.32 15.17 18 13.66 18 12s-.68-3.17-1.77-4.25zM5.65 5.63l-.7-.71C3.13 6.73 2 9.24 2 12s1.13 5.27 2.95 7.08l.71-.71C4.02 16.74 3 14.49 3 12s1.02-4.74 2.65-6.37zm13.4-.71-.71.71C19.98 7.26 21 9.51 21 12s-1.02 4.74-2.65 6.37l.71.71C20.87 17.27 22 14.76 22 12s-1.13-5.27-2.95-7.08z"></path></g></svg></div> Live</li>
                            </Link>
                            <Link to={`/results?search_query=${encodeURIComponent("Gaming")}`}>
                                <li
                                    className={`flex h-10 text-sm px-3 cursor-pointer items-center hover:bg-slate-200 rounded-xl ${activeButton === 'Gaming' ? 'bg-slate-200' : ''
                                        }`}
                                    onClick={() => handleButtonClick('Gaming')}
                                ><div className='mr-6'><svg height="24" viewBox="0 0 24 24" width="24" focusable="false"><path d="M10 12H8v2H6v-2H4v-2h2V8h2v2h2v2zm7 .5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5.67 1.5 1.5 1.5 1.5-.67 1.5-1.5zm3-3c0-.83-.67-1.5-1.5-1.5S17 8.67 17 9.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5zm-3.03-4.35-4.5 2.53-.49.27-.49-.27-4.5-2.53L3 7.39v6.43l8.98 5.04 8.98-5.04V7.39l-3.99-2.24m0-1.15 4.99 2.8v7.6L11.98 20 2 14.4V6.8L6.99 4l4.99 2.8L16.97 4z"></path></svg></div> Gaming</li>
                            </Link>
                            <Link to={`/results?search_query=${encodeURIComponent("News")}`}>
                                <li
                                    className={`flex h-10 text-sm px-3 cursor-pointer items-center hover:bg-slate-200 rounded-xl ${activeButton === 'News' ? 'bg-slate-200' : ''
                                        }`}
                                    onClick={() => handleButtonClick('News')}
                                ><div className='mr-6'><svg height="24" viewBox="0 0 24 24" width="24" focusable="false"><path d="M11 11v6H7v-6h4m1-1H6v8h6v-8zM3 3.03V21h14l4-4V3.03M20 4v11.99l-.01.01H16v3.99l-.01.01H4V4h16zm-2 4H6V6h12v2zm0 7h-5v-2h5v2zm0-3h-5v-2h5v2z"></path></svg></div> News</li>
                            </Link>
                        </ul>
                    </div>

                    {/* : (
                    <ul className='flex flex-col'>
                        <li className='text-[10px] p-4 w-12 flex flex-col items-center justify-center hover:bg-slate-200 rounded-lg cursor-pointer'><div className=''><svg height="24" viewBox="0 0 24 24" width="24" focusable="false" ><g><path d="M4 21V10.08l8-6.96 8 6.96V21h-6v-6h-4v6H4z"></path></g></svg></div> Home</li>
                        <li className='text-[10px] p-4 w-12 flex flex-col items-center justify-center hover:bg-slate-200 rounded-lg cursor-pointer'><div className=''><svg height="24" viewBox="0 0 24 24" width="24" focusable="false"><path d="M10 14.65v-5.3L15 12l-5 2.65zm7.77-4.33-1.2-.5L18 9.06c1.84-.96 2.53-3.23 1.56-5.06s-3.24-2.53-5.07-1.56L6 6.94c-1.29.68-2.07 2.04-2 3.49.07 1.42.93 2.67 2.22 3.25.03.01 1.2.5 1.2.5L6 14.93c-1.83.97-2.53 3.24-1.56 5.07.97 1.83 3.24 2.53 5.07 1.56l8.5-4.5c1.29-.68 2.06-2.04 1.99-3.49-.07-1.42-.94-2.68-2.23-3.25zm-.23 5.86-8.5 4.5c-1.34.71-3.01.2-3.72-1.14-.71-1.34-.2-3.01 1.14-3.72l2.04-1.08v-1.21l-.69-.28-1.11-.46c-.99-.41-1.65-1.35-1.7-2.41-.05-1.06.52-2.06 1.46-2.56l8.5-4.5c1.34-.71 3.01-.2 3.72 1.14.71 1.34.2 3.01-1.14 3.72L15.5 9.26v1.21l1.8.74c.99.41 1.65 1.35 1.7 2.41.05 1.06-.52 2.06-1.46 2.56z"></path></svg></div>Shorts</li>
                        <li className='text-[10px] p-4 w-14 flex flex-col items-center justify-center hover:bg-slate-200 rounded-lg cursor-pointer'><div className=''><svg height="24" viewBox="0 0 24 24" width="24" focusable="false"><path d="M10 18v-6l5 3-5 3zm7-15H7v1h10V3zm3 3H4v1h16V6zm2 3H2v12h20V9zM3 10h18v10H3V10z"></path></svg></div>Subscription</li>
                        <li className='text-[10px] p-4 w-12 flex flex-col items-center justify-center hover:bg-slate-200 rounded-lg cursor-pointer'><div className=''><svg height="24" viewBox="0 0 24 24" width="24" focusable="false"><path d="m11 7 6 3.5-6 3.5V7zm7 13H4V6H3v15h15v-1zm3-2H6V3h15v15zM7 17h13V4H7v13z"></path></svg></div> Library</li>
                    </ul>
                ) */}

                </div>
            }
        </>
    )
}

export default SideBar