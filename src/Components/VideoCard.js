import React from 'react'
import { Link } from 'react-router-dom';

const VideoCard = ({ data }) => {
    const { snippet, statistics } = data;
    const { channelTitle, thumbnails, localized, title} = snippet;
 
   
  
    let truncatedTitle = title;
    if (title.length > 70) {
      truncatedTitle = title.slice(0, 70) + "...";
    }
  return (
    <div className="w-1/4 max-lg:w-1/3 max-md:w-1/2 max-sm:w-full p-2">
        <Link to={"/watch?v="+data.id} >
    <div className="flex flex-col shadow-xl rounded-lg min-h-80">
      <div className="w-full">
        <img src={snippet?.thumbnails?.medium.url} className="rounded-t-lg w-full" alt="Video thumbnail" />
      </div>
      <div className="p-2 w-full">
        <h3 className="font-semibold text-black">{truncatedTitle}</h3>
        <p className="text-md">{channelTitle}</p>
        <p>{Math.round(statistics?.viewCount / 1000)}k views</p>
        <p>Published</p>
      </div>
    </div>
    </Link>
  </div>

  )
}

export const SideBarVideo = ({data}) =>{
  const { snippet, statistics } = data;
  const { channelTitle, thumbnails, localized } = snippet;
  const { medium } = thumbnails;
  const { viewCount } = statistics;

  

  let truncatedTitle = localized.title;
  if (localized.title.length > 70) {
    truncatedTitle = localized.title.slice(0, 70) + "...";
  }
  return(
    <div className=" max-lg:w-full p-2">
    <Link to={"/watch?v="+data.id} >
<div className="flex flex-row shadow-xl rounded-lg ">
  <div className="w-full">
    <img src={medium.url} className="rounded-l-lg w-full" alt="Video thumbnail" />
  </div>
  <div className="p-2 w-full">
    <h3 className="font-semibold text-black">{truncatedTitle}</h3>
    <p className="text-md">{channelTitle}</p>
    <p>{Math.round(viewCount / 1000)}k views</p>
  
  </div>
</div>
</Link>
</div>
  )

}

export default VideoCard