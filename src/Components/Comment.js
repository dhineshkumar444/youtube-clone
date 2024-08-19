import React from 'react'

const Comment = ({value}) => {
  return (
    <div className='bg-gray-200 p-2 m-2 rounded-lg flex jus items-center gap-5 w-full max-md:w-full'>
        <img className='rounded-full' src={value.snippet.topLevelComment.snippet.authorProfileImageUrl} alt={"textDisplay"} width={30} />
         <div>
           <p className='font-bold'>{value.snippet.topLevelComment.snippet.authorDisplayName}</p>

           <p>{value.snippet.topLevelComment.snippet.textDisplay}</p>
           <div className='flex gap-5 p-3 '>
            <p><span>👍</span> <spa>{value.snippet.topLevelComment.snippet.likeCount>1000?value.snippet.topLevelComment.snippet.likeCount/1000+"k":value.snippet.topLevelComment.snippet.likeCount}</spa></p>
            <p>👎</p>
            <p>Reply</p>
           </div>
           </div>
           
    </div>
  )
}

export default Comment