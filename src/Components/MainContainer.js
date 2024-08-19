import React from 'react'
import ButtonList from './ButtonList'
import VideoContainer from './VideoContainer'
import { useSelector } from 'react-redux'

const MainContainer = () => {
  const isMenuOpen = useSelector((store)=> store.app.isMenuOpen)

  return (
    <div className={!isMenuOpen?'w-5/6 max-lg:w-4/6 max-sm:w-1/2':"w-full"}>
        <ButtonList />
        <VideoContainer />
    </div>
  )
}

export default MainContainer