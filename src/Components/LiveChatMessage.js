import React from 'react'

const LiveChatMessage = ({value}) => {
 
  return (
    <div className='flex gap-4 m-2 items-center max-sm:gap-2' >
        <img className="max-sm:w-5 max-sm:h-5 rounded-full" src='https://tse3.mm.bing.net/th?id=OIP.w2McZSq-EYWxh02iSvC3xwHaHa&pid=Api&P=0&' width={20}  height={20} alt='user-logo'/>
        <p className='font-bold'>{value?.name}</p>
        <p>{value?.message}</p>
    </div>
  )
}

export default LiveChatMessage