import React from 'react'
import VideoContainer from "./VideoContainer"
import { useSelector } from 'react-redux'

const SearchPage = () => {

  const searchVal = useSelector((store)=> store.searchResult.value)
  return (
   <div>
   
   {searchVal&&<p>Search Results for {searchVal}</p>}
   <VideoContainer />
   </div>
  )
}

export default SearchPage