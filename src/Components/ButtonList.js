import React from 'react'
import Button from './Button'
import { buttonList } from '../utils/sideBarSVG'
import "../../src/HideScroll.css"

const ButtonList = () => {

  return (
    <div className='overflow-x-auto hide-scrollbar my-5'>
    <div className='flex flex-nowrap w-max'>
      {buttonList.map((button, index) => (
        <Button key={index} value={button} />
      ))}
    </div>
  </div>
  )
}

export default ButtonList;