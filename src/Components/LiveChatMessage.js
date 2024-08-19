import React from 'react'

const LiveChatMessage = ({value}) => {
 
  return (
    <div className='flex gap-4 m-2' >
        <img src='https://tse3.mm.bing.net/th?id=OIP.w2McZSq-EYWxh02iSvC3xwHaHa&pid=Api&P=0&' width={30}  height={20} alt='user-logo' className='rounded-full'/>
        <p className='font-bold'>{value?.name}</p>
        <p>{value?.message}</p>
    </div>
  )
}

export default LiveChatMessage