import React, { useEffect, useState } from 'react';
import { YOUTUBE_VIDEOS_API } from '../utils/youtubeAPI';
import VideoCard from './VideoCard';
import { Link } from 'react-router-dom';
import Hoc from './Hoc';
import { useSelector } from 'react-redux';

const VideoContainer = () => {
  const [videos, setVideos] = useState([]);
const api = useSelector((store)=> store.suggestionSearch.search);
//const viewApi = `https://www.googleapis.com/youtube/v3/videos?key=${YOUTUBE_VIDEOS_API}&fields=items(snippet(title,tags,channelTitle,publishedAt),statistics(viewCount))&part=snippet,statistics&id=[VIDEOID]`
//console.log(api);
  useEffect(() => {
    const getVideos = async () => {
      try {
        const response = await fetch(api);
       

        if (!response.ok) {
          throw new Error('Failed to fetch videos');
        }
        const videoData = await response.json();
        setVideos(videoData.items);
        console.log(videos); // Assuming `items` is the array with video data
      } catch (error) {
        console.error('Error fetching video data:', error);
      }
    };

    getVideos();
  }, [api]);

 

  return (
    <div className='flex flex-wrap h-lvh overflow-y-auto'>
    
      {videos.map((video) => (
        // <Link to={`/watch?${video.id}`} key={video.id}>
          <VideoCard data={video} />
        // {/* </Link> */}
      ))}
    </div>
  );
};

export default VideoContainer;
