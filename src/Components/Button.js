import React from 'react'

const Button = ({value}) => {

 
  return (
    <div className='py-2 px-5 bg-gray-300 mx-2  rounded-lg font-semibold'>
        <button>{value.buttonName}</button>
    </div>
  )
}

export default Button