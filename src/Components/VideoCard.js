import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { YOUTUBE_VIDEOS_API } from '../utils/youtubeAPI';
import { useSelector } from 'react-redux';

const VideoCard = ({ data }) => {
    const { snippet, statistics } = data;
    const { channelTitle, thumbnails, localized, title} = snippet;
    const api = useSelector((store)=> store.suggestionSearch.search);
    const [viewState, setViewState] = useState();
 
  
    let truncatedTitle = title;
    if (title.length > 70) {
      truncatedTitle = title.slice(0, 60) + "...";
    }
    const videoId = data.id.videoId ? data.id.videoId : data.id;
    
    let m="";
    if(viewState>1000){
    if((viewState / 1000)>1000){
     
        m=(((viewState)/1000000).toFixed(1))+"M"
    }
    else{
     m = Math.round(( (viewState) / 1000))+"k"
    }
  }
    else{
m=viewState;
    }

   
    useEffect(()=>{
      const viewData = async() => {
        const viewApi = await fetch(`https://www.googleapis.com/youtube/v3/videos?key=AIzaSyCuMxbXFEuOdPSw0sqdw6A01jyo1eAHT3A&fields=items(snippet(title,tags,channelTitle,publishedAt),statistics(viewCount))&part=snippet,statistics&id=${videoId}`)
      const JsonviewApi = await viewApi.json();
      console.log(JsonviewApi.items[0].statistics.viewCount)
      setViewState(JsonviewApi.items[0].statistics.viewCount);
      }
      viewData();
      


    },[api])

  return (
    <div className="w-1/4 max-lg:w-1/3 max-md:w-1/2 max-sm:w-full p-2 min-h-60">
        <Link to={`/watch?v=${videoId}`} >
    <div className="shadow-xl rounded-lg  h-full">
      <div className="w-full">
        <img src={snippet?.thumbnails?.medium.url} className="rounded-t-lg w-full" alt="Video thumbnail" />
      </div>
      <div className="p-2 w-full flex items-start gap-3">
       
          <img className=''  src="https://tse3.mm.bing.net/th?id=OIP.w2McZSq-EYWxh02iSvC3xwHaHa&pid=Api&P=0&"
          alt="user-logo" width={30} height={30}
        
           />
      
        <div>
        <h3 className="font-semibold text-black">{truncatedTitle}</h3>
        <p className="text-md">{channelTitle}</p>
        <p>{m} views</p>
        
        </div>
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
  let m="";
  if(viewCount >1000){
  if((viewCount / 1000)>1000){
   
      m=(((viewCount)/1000000).toFixed(1))+"M"
  }
  else{
   m = Math.round(( (viewCount) / 1000))+"k"
  }
}
  else{
m=viewCount / 1000;
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
    <p>{m} views</p>
  
  </div>
</div>
</Link>
</div>
  )

}

export default VideoCard





