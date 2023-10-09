import React from 'react'

const Button = ({name,element}) => {
  // console.log(element)
  return (
    <div>
        <button className={`px-4 py-1 m-1 text-sm rounded-lg ${
      element === name ? 'bg-black text-white' : 'bg-gray-200'
    }`}>{name}</button>
    </div>
  )
}

export default Button