import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeMenu } from "../utils/appSlice";
import { useSearchParams } from "react-router-dom";
import CommentsContainer from "./CommentsContainer";
import VideoContainer from "./VideoContainer";
import { useEffect, useState } from "react";
import { YOUTUBE_VIDEOS_API } from "../utils/youtubeAPI";
import { SideBarVideo } from "./VideoCard";
import { Link } from "react-router-dom";
import Hoc from "./Hoc";
import LiveChat from "./LiveChat";
import { updateChat } from "../utils/chatSlice";

const VideoWatchPage = () => {
  const dispatch = useDispatch();

  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);
  const [searchParams] = useSearchParams();

  const dynamicId = searchParams.get("v");
  const [videos, setVideos] = useState([]);
  const [Live, setLive] = useState(false);
  const [liveComment, setLiveComment] = useState("true");
  console.log(isMenuOpen);

  useEffect(() => {
    dispatch(closeMenu());
    const getVideos = async () => {
      try {
        const response = await fetch(YOUTUBE_VIDEOS_API);
        if (!response.ok) {
          throw new Error("Failed to fetch videos");
        }
        const videoData = await response.json();
        setVideos(videoData.items); // Assuming `items` is the array with video data
      } catch (error) {
        console.error("Error fetching video data:", error);
      }
    };

    getVideos();
  }, []);
  return (
    <div
      className={`flex flex-row max-lg:flex-col ${
        !isMenuOpen ? "w-5/6" : "w-full"
      }`}
    >
      <div className="flex flex-col w-3/5 max-lg:w-full">
        <div className="w-full p-7 h-lvh max-md:h-80">
          <iframe
            className="h-5/6 w-full rounded-lg max-lg:h-full max-md:h-80"
            src={"https://www.youtube.com/embed/" + dynamicId}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>

       {Live? <CommentsContainer />:  (
        <div className=" h-lvh p-7 rounded-lg">
          <h1 className="font-bold text-xl p-5">Live Chat</h1>
          <LiveChat />
          <form
            className="w-full border-2 border-slate-300 rounded-lg p-2"
            onSubmit={(e) => {
              e.preventDefault();
              dispatch(
                updateChat({
                  name: "Dhinesh",
                  message: liveComment,
                })
              );
              setLiveComment("");
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
      )}
      </div>
       
        <>
          <div className=" w-2/5 m-2 mt-6 max-lg:hidden">
            <div>
              <button
                className="p-2 bg-green-300 rounded-lg font-bold"
                onClick={() => setLive(!Live)}
              >
                See Live Chat
              </button>
            </div>
            {videos.map((video) => (
              // <Link to={`/watch?${video.id}`} key={video.id}>
              <SideBarVideo data={video} />
              // {/* </Link> */}
            ))}
          </div>
        </>
    
    </div>
  );
};

export default VideoWatchPage;

