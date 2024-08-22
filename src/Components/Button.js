import React from 'react'

const Button = ({value}) => {

  const feature =()=>{
    alert("Feature implementation is ongoing. Please check later.")
  }
  return (
    <div className='py-2 px-5 bg-gray-300 mx-2  rounded-lg font-semibold'  onClick={feature}>
        <button>{value.buttonName}</button>
    </div>
  )
}

export default Button