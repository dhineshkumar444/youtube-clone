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
      console.log(val + "> 100000");

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
  const totalLikes = videoDetails?.statistics?.likeCount;
  console.log(videoDetails);

  function timeAgo(date) {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    let interval = Math.floor(seconds / 31536000);

    if (interval >= 1) {
      return `${interval} year${interval > 1 ? "s" : ""} ago`;
    }
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
      return `${interval} month${interval > 1 ? "s" : ""} ago`;
    }
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) {
      return `${interval} day${interval > 1 ? "s" : ""} ago`;
    }
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) {
      return `${interval} hour${interval > 1 ? "s" : ""} ago`;
    }
    interval = Math.floor(seconds / 60);
    if (interval >= 1) {
      return `${interval} minute${interval > 1 ? "s" : ""} ago`;
    }
    return `Just now`;
  }

  const youtubeDate = "2024-08-19T11:29:46Z";
  console.log(timeAgo(youtubeDate)); // Example output: "2 days ago" if the date difference is more than 48 hours

  const feature =()=>{
    alert("Feature implementation is ongoing. Please check later.")
  }

  return (
    <div
      className={`flex flex-row max-lg:flex-col  transition ease-in-out duration-500
       w-full
      `}
    >
      <div className="flex flex-col w-3/5 max-lg:w-full ">
        <div className="h-auto">
          <div className="w-full px-7 py-3 max-sm:px-3 max-sm:min-h-[0vh] max-lg:px-5 ">
            <div className="flex justify-center items-center">
            <iframe
              className=" w-full rounded-t-lg h-[80vh] max-sm:h-[50vh] "
              src={`https://www.youtube.com/embed/${dynamicId}?autoplay=1`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
            </div>

            {videoDetails && (
              <div className="p-4 border-2 border-slate-300 bg-gray-100 rounded-b-lg max-sm:p-2">
                <h2
                  title={videoDetails.snippet.title}
                  className="font-bold text-xl max-md:text-lg max-sm:text-md"
                >
                  {videoDetails.snippet.title}
                </h2>
                <div className="flex  p-2 justify-between items-center max-md:items-center max-md:gap-3 max-sm:flex-col max-sm:gap-5">
                  <div className="flex max-md:gap-2 gap-3 items-center w-1/3 max-md:w-full max-sm:">
                    <img
                      className="w-10 h-9"
                      src="https://tse3.mm.bing.net/th?id=OIP.w2McZSq-EYWxh02iSvC3xwHaHa&pid=Api&P=0&"
                      alt="user-logo"
                    />
                    <div>
                      <p className=" font-bold max-sm:text-md text-gray-700 flex text-lg flex-nowrap max-md:text-[16px] ">
                        {videoDetails.snippet.channelTitle}
                      </p>
                      <p>{/* Fetch subscriber count dynamically here */}</p>
                    </div>
                  </div>
                  <div className="flex justify-around  w-2/3 max-md:w-full max-md:justify-between ">
                    <div>
                      <button className="px-3 py-2 bg-black text-white rounded-3xl font-semibold " onClick={feature}>
                        Subscribe
                      </button>
                    </div>
                    <div className="flex items-center justify-between gap-5 bg-slate-200 border border-gray-200 px-3 py-2 rounded-3xl ">
                      <div className="flex gap-3 pr-4 border-r-2 border-gray-300">
                        <img
                          src="https://clipground.com/images/youtube-like-icon-png-9.png"
                          width={30}
                          height={20}
                          onClick={feature}
                        />
                        <p>{count(totalLikes)}</p>
                      </div>
                      <img
                        className=" "
                        src="https://pngimg.com/uploads/dislike/dislike_PNG78.png"
                        width={25}
                        height={20}
                        onClick={feature}
                      />
                    </div>
                  </div>
                  <div className="bg-gray-200 rounded-full p-2 max-md:hidden">
                    <img
                      src="https://cdn.icon-icons.com/icons2/1674/PNG/512/morevertical_110934.png"
                      width={30}
                      height={30}
                      onClick={feature}
                    />
                  </div>
                </div>

                <p className="text-gray-500 p-2 font-normal text-lg">
                  {count(totalViews)} views.{" "}
                  <span>{timeAgo(videoDetails.snippet.publishedAt)}</span>
                </p>
                <p></p>
              </div>
            )}
          </div>
        </div>

        {live ? (
          <div className="h-max px-7 py-2 rounded-lg max-sm:px-3">
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
              className="w-full  rounded-lg p-3 m-2"
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
                className="w-3/5 focus:border-b-2 p-2  focus:border-blue-500 focus:outline-none"
                type="text"
                placeholder="Add comment in live..."
                onChange={(e) => setLiveComment(e.target.value)}
                value={liveComment}
              />
              <button className="w-2/5 px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition duration-200">Add Comment</button>
            </form>
          </div>
        ) : (
          <>
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
