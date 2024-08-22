import React from 'react'
import VideoContainer from "./VideoContainer"
import { useSelector } from 'react-redux'

const SearchPage = () => {

  const searchVal = useSelector((store)=> store.searchResult.value)
  return (
   <div className='p-3'>
   
   {searchVal&&<p className='font-bold text-black-400 text-xl p-3'>Search Results for "<span className='font-bold text-green-700 text-xl'>{searchVal}</span>" </p>}
   <VideoContainer />
   </div>
  )
}

export default SearchPage