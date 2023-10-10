import React from 'react'

const ShimmerVertical = () => {
  return (
    <div className="flex flex-wrap p-2 w-[80%] mx-auto sm:w-full justify-center">
      {Array(50)
        .fill("")
        .map((e, index) => (
          <div className="animate-pulse w-full sm:flex" key={index}>
            <div className='bg-gray-300 rounded-lg m-2 w-full sm:w-80 h-40'></div>
            <div className='mr-9 w-full'>
              <div className='flex flex-col w-full sm:w-full'>
                <div className='bg-gray-300 m-2 h-5 '></div>
                <div className='bg-gray-300 m-2 h-5 w-2/4'></div>
                <div className='bg-gray-300 m-2 h-5'></div>
              </div>
            </div>
          </div>
        ))}
    </div>
  )
}

export default ShimmerVertical