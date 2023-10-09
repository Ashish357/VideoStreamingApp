import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { toggleMenu } from '../utils/appSlice';
import { Link } from 'react-router-dom';
import Search from './Search';
import { FaSearch, FaArrowLeft } from 'react-icons/fa';
import { MENU_ICON, USER_ICON, YOUTUBE_LOGO } from '../utils/constants';

const Header = () => {
  const [expanded, setExpanded] = useState(false);

  // Function to toggle the expanded state
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const dispatch = useDispatch();

  const toggleMenuHandler = () => {
    dispatch(toggleMenu())
  }


  return (
    <div className='grid grid-flow-col h-14 items-center px-4'>
      <div className={`flex col-span-2 items-center ${expanded === false ? '' : 'max-sm:hidden'}`}>
        <img
          data-testid="sidebar-toggle"
          onClick={toggleMenuHandler}
          className='h-5 sm:h-7 px-2 cursor-pointer'
          src={MENU_ICON} alt="Menu" />

        <Link to='/'>
          <img
            data-testid="logo"
            className='h-5 px-2'
            src={YOUTUBE_LOGO} alt="Youtube-logo" />
        </Link>
      </div>


      <div className='sm:col-span-9 mr-2 sm:mr- flex items-center sm:justify-center gap-2'>
        {/* Display the search icon */}
        {expanded && (
          <div
            className="cursor-pointer pl-2 sm:hidden"
            onClick={toggleExpanded}
          >
            <FaArrowLeft size={16} />
          </div>
        )}
        <div className={`relative ${expanded === true ? 'max-sm:w-full' : 'max-sm:hidden'}`}>
          <Search />
        </div>
      </div>

      <div className={`col-span-1 flex space-x-2 justify-end items-center ${expanded === false ? '' : 'max-sm:hidden'}`}>
        {!expanded && <div
          className="cursor-pointer sm:hidden"
          onClick={toggleExpanded}
        >
          <FaSearch size={20} />
        </div>}
        <img className='h-6 md:h-8'
          src={USER_ICON} alt="user-icon" />
      </div>
    </div>
  )
}

export default Header                                      