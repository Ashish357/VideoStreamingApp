import React, {useRef, useState} from 'react'
import Button from './Button'
import {FaArrowLeft,FaArrowRight} from 'react-icons/fa'

// const list = ["All", "Gaming", "Songs", "Live", "Cricket", "Soccer", "News", "Cooking", "Valentine", "Cricket", "Soccer", "News"]
const keywords = [
  'All',
  'React js',
  'Angular js',
  'React Native',
  'use of API',
  'Redux',
  'Music',
  'Algorithm Art ',
  'Guitar',
  'Bengali Songs',
  'Coding',
  'Cricket',
  'Football',
  'Real Madrid',
  'Gatsby',
  'Poor Coder',
  'Shwetabh',
]
const ButtonList = ({onCategoryClick}) => {
  const [activeElement, setActiveElement] = useState('All')
  const scrollRef = useRef(null);
  const scrollStep = 150; // Adjust the scroll step as needed

  const scrollLeft = () => {
    scrollRef.current.scrollLeft -= scrollStep;
  };

  const scrollRight = () => {
    scrollRef.current.scrollLeft += scrollStep;
  };

  return (
    <div className='flex sticky justify-center z-40'>
      <div className='flex items-center justify-end'>
      <button onClick={scrollLeft} className='max-sm:hidden'><FaArrowLeft size={16}/></button>
      </div>
      <div data-testid="btn-list" ref={scrollRef} className='hide-scrollBar flex max-w-[86%] whitespace-nowrap overflow-x-scroll mx-4'>
        {
          keywords.map((button, index) => (
            <div key={index} onClick={()=>{setActiveElement(button);onCategoryClick(button);}}>
            <Button name={button} element={activeElement}/>
            </div>
          ))
        }
      </div>
      <div className='flex items-center'>
      <button onClick={scrollRight} className='max-sm:hidden'><FaArrowRight size={16}/></button>
      </div>
    </div>
  )
}

export default ButtonList; 