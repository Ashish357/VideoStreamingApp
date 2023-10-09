import React, { useEffect, useState } from 'react'
import ButtonList from './ButtonList'
import VideoContainer from './VideoContainer'
import { useDispatch, useSelector } from 'react-redux'
import { closeMenu } from '../utils/appSlice'

const MainContainer = () => {
  const [selectedCategory,setSelectedCategory] = useState("All")
  const isMenuOpen = useSelector(store => store.app.isMenuOpen);
  const dispatch = useDispatch();

  useEffect(() => {
    if(window.innerWidth<=640){
        dispatch(closeMenu());
    }
  }, [])
  
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  }
  
  return (
    <div className={`w-full h-full overflow-y-auto ${isMenuOpen ? 'max-sm:fixed mx-4':'max-sm:static max-sm:mx-2'}`}>
        <ButtonList onCategoryClick={handleCategoryClick}/>
        <VideoContainer category={selectedCategory}/>
    </div>
  )
}

export default MainContainer