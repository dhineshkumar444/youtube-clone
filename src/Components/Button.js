import React from 'react'
import { useDispatch } from 'react-redux'
import { searchSuggestion } from '../utils/suggestionSearch';

const Button = ({value}) => {
  const dispatch = useDispatch();

  const feature =(val)=>{
   dispatch(searchSuggestion(val))
  }
  return (
    <div className='py-2 px-5 bg-gray-300 mx-2  rounded-lg font-semibold'  onClick={()=> feature(value.buttonName)}>
        <button>{value.buttonName}</button>
    </div>
  )
}

export default Button