import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeMenu } from "../utils/appSlice";
import { useSearchParams } from "react-router-dom";
import CommentsContainer from "./CommentsContainer";
import LiveChat from "./LiveChat";
import { SideBarVideo } from "./VideoCard";
import { updateChat } from "../utils/chatSlice";
import { GOOGLE_API_KEY, YOUTUBE_VIDEOS_API } from "../utils/youtubeAPI";

const VideoWatchPage = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);

  const dynamicId = searchParams.get("v");
  const [videos, setVideos] = useState([]);
  const [videoDetails, setVideoDetails] = useState(null);
  const [live, setLive] = useState(false);
  const [liveComment, setLiveComment] = useState("");

  useEffect(() => {
    dispatch(closeMenu());

    const getVideos = async () => {
      try {
        const response = await fetch(YOUTUBE_VIDEOS_API);
        if (!response.ok) {
          throw new Error("Failed to fetch videos");
        }
        const videoData = await response.json();
        setVideos(videoData.items);
      } catch (error) {
        console.error("Error fetching video data:", error);
      }
    };

    const fetchVideoDetails = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${dynamicId}&key=${GOOGLE_API_KEY}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch video details");
        }
        const videoDetailData = await response.json();
        setVideoDetails(videoDetailData.items[0]);
      } catch (error) {
        console.error("Error fetching video details:", error);
      }
    };

    if (dynamicId) {
      fetchVideoDetails();
    }
    getVideos();
  }, [dynamicId]);

  const count = (val) => {
    console.log(val);
    let m = "";
    if (Number(val) > 1000) {
    console.log(val+"> 100000");

      if (val / 1000 > 1000) {
        m = (val / 1000000).toFixed(1) + "M";
    console.log(m);

      } else {
        m = (val / 1000).toFixed(0) + "k";
      }
    } else {
      m = val;
    }

    return m;
  };

  const totalViews = videoDetails?.statistics?.viewCount;
  const totalLikes = videoDetails?.statistics?.likeCount
console.log(videoDetails);


function timeAgo(date) {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  let interval = Math.floor(seconds / 31536000);

  if (interval >= 1) {
      return `${interval} year${interval > 1 ? 's' : ''} ago`;
  }
  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) {
      return `${interval} month${interval > 1 ? 's' : ''} ago`;
  }
  interval = Math.floor(seconds / 86400);
  if (interval >= 1) {
      return `${interval} day${interval > 1 ? 's' : ''} ago`;
  }
  interval = Math.floor(seconds / 3600);
  if (interval >= 1) {
      return `${interval} hour${interval > 1 ? 's' : ''} ago`;
  }
  interval = Math.floor(seconds / 60);
  if (interval >= 1) {
      return `${interval} minute${interval > 1 ? 's' : ''} ago`;
  }
  return `Just now`;
}

const youtubeDate = "2024-08-19T11:29:46Z";
console.log(timeAgo(youtubeDate));  // Example output: "2 days ago" if the date difference is more than 48 hours

  return (
    <div
      className={`flex flex-row max-lg:flex-col  transition ease-in-out duration-500
       w-full
      `}
    >
      <div className="flex flex-col w-3/5 max-lg:w-full ">
        <div className="w-full px-7 py-3 max-sm:px-3  h-lvh overflow-auto">
         
          <iframe
            className=" w-full rounded-t-lg max-lsm:h-3/6  h-4/6 "
            src={`https://www.youtube.com/embed/${dynamicId}`}
          
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
          
          {videoDetails && (
            <div className="p-4 border-2 border-slate-300 bg-gray-100 rounded-b-lg max-md:h-2/6 max-sm:p-2">
              <h2 title={videoDetails.snippet.title} className="font-bold text-xl max-md:text-lg max-sm:text-md">
                {videoDetails.snippet.title}
              </h2>
              <div className="flex  p-2 justify-between items-center max-md:items-start max-md:gap-5">
                <div className="flex max-md:gap-2 gap-3 items-center w-1/3 max-md:w-full max-sm:">
                  <img className="w-10 h-9"
                    src="https://tse3.mm.bing.net/th?id=OIP.w2McZSq-EYWxh02iSvC3xwHaHa&pid=Api&P=0&"
                    alt="user-logo"
                    
                  />
                  <div>
                    <p className=" font-bold max-sm:text-md text-gray-700 flex text-lg flex-nowrap max-md:whitespace-nowrap">
                      {videoDetails.snippet.channelTitle}
                    </p>
                    <p>{/* Fetch subscriber count dynamically here */}</p>
                  </div>
                </div>
                <div className="flex justify-around  w-2/3 max-md:w-full max-md:justify-between max-lsm:justify-end ">
                <div>
                  <button className="px-3 py-2 bg-black text-white rounded-3xl font-semibold ">
                    Subscribe
                  </button>
                </div>
                <div className="flex items-center justify-between gap-5 bg-slate-200 border border-gray-200 px-3 py-2 rounded-3xl max-lsm:hidden ">
                  <div className="flex gap-3 pr-4 border-r-2 border-gray-300">
                    <img
                      src="https://clipground.com/images/youtube-like-icon-png-9.png"
                      width={30}
                      height={20}
                    />
                    <p>{count(totalLikes)}</p>
                  </div>
                  <img
                    className=" "
                    src="https://pngimg.com/uploads/dislike/dislike_PNG78.png"
                    width={25}
                    height={20}
                  />
                </div>
                </div>
                <div  className="bg-gray-200 rounded-full p-2 max-md:hidden">
                <img  src="https://cdn.icon-icons.com/icons2/1674/PNG/512/morevertical_110934.png" width={30} height={30} />
                </div>
              </div>

              <p className="text-gray-500 p-2 font-normal text-lg">
                {count(totalViews)} views. <span>{timeAgo(videoDetails.snippet.publishedAt)}</span>
              </p>
              <p></p>
            </div>
          )}
        </div>

        {live ? (
          <div className="h-max px-7 py-2 rounded-lg">
            <div className="flex justify-between">
            <h1 className="font-bold text-xl p-5">Live Chat</h1>
            <button
          className="p-1  mx-5 mt-5 text-green-500 bg-gray-200 border border-gray-500 text-lg w-max rounded-lg font-bold mb-4"
          onClick={() => setLive(!live)}
        >
          {live ? "Hide Live Chat" : "See Live Chat"}
        </button>
        </div>
            <LiveChat />
            <form
              className="w-full border-2 border-slate-300 rounded-lg p-2"
              onSubmit={(e) => {
                e.preventDefault();
                if (liveComment.trim() !== "") {
                  dispatch(
                    updateChat({
                      name: "User",
                      message: liveComment,
                    })
                  );
                  setLiveComment("");
                }
              }}
            >
              <input
                className="w-3/5 outline-none border-r-2 border-slate-400 rounded-s-lg"
                type="text"
                onChange={(e) => setLiveComment(e.target.value)}
                value={liveComment}
              />
              <button className="w-2/5">Add Comment</button>
            </form>
          </div>
        ) : (<>
        <div className="flex items-center justify-between px-10">
         <h1 className="font-bold text-lg">Comments</h1>
         <button
          className="p-1  mx-5 mt-5 text-green-500 bg-gray-200 border border-gray-500 text-lg w-max rounded-lg font-bold mb-4"
          onClick={() => setLive(!live)}
        >
          {live ? "Hide Live Chat" : "See Live Chat"}
        </button>
        </div>
        
          <CommentsContainer />
          
          </>
        )}
      </div>

      <div className="w-2/5 m-2 mt-6 max-lg:hidden">
     
        {videos.map((video) => (
          <SideBarVideo key={video.id.videoId || video.id} data={video} />
        ))}
      </div>
    </div>
  );
};

export default VideoWatchPage;


