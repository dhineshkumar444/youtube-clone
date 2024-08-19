import React, { useEffect, useState } from "react";
import Comment from "./Comment";
import { useSearchParams } from "react-router-dom";

const CommentsContainer = () => {
 
  const [comments, setComments] = useState([]);
  const [searchParams] = useSearchParams();
  const dynamicId = searchParams.get("v");
  useEffect(() => {
    const commentData = async () => {
      const data = await fetch(
        `https://www.googleapis.com/youtube/v3/commentThreads?key=AIzaSyDAELMvnwwOopIQ3-QvaELpwe_MMRf6Su8&textFormat=plainText&part=snippet&videoId=${dynamicId}&maxResults=100`
      );
      const jsonData = await data.json();

      setComments(jsonData.items);
     
    };
    commentData();
  }, []);
  return (
    <div className="m-5 max-lg:max-h-60 overflow-auto">
        <h1>Comments</h1>
        {
            comments.map((comment) => (
                <Comment value={comment} />
            ))
        }
    </div>
  )
};

export default CommentsContainer;
