import React, { useEffect, useState } from "react";
import Comment from "./Comment";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "../utils/commentSlice";
import { GOOGLE_API_KEY } from "../utils/youtubeAPI";

const CommentsContainer = () => {
  const [addComments, setAddComments] = useState("");
  const [searchParams] = useSearchParams();
  const dynamicId = searchParams.get("v");
  const dispatch = useDispatch();
  const comments = useSelector((store) => store.comment.comments);

  useEffect(() => {
    const fetchComments = async () => {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/commentThreads?key=${GOOGLE_API_KEY}&textFormat=plainText&part=snippet&videoId=${dynamicId}&maxResults=100`
      );
      const jsonData = await response.json();

      // Dispatch only the items array
      dispatch(addComment(jsonData.items));
    };

    fetchComments();
  }, [dynamicId, dispatch]);

  const addTextComment = () => {
    dispatch(
      addComment([
        {
          snippet: {
            topLevelComment: {
              snippet: {
                authorProfileImageUrl:
                  "https://tse3.mm.bing.net/th?id=OIP.w2McZSq-EYWxh02iSvC3xwHaHa&pid=Api&P=0&",
                authorDisplayName: "Dhinesh",
                textDisplay: addComments,
              },
            },
          },
        },
      ])
    );
    setAddComments("");
  };

  return (
    <div className="m-5">
      <h1 className="font-bold text-lg">Comments</h1>
      <div className="p-3">
        <input
          className="w-full focus:border-b-2 p-2  focus:border-blue-500 focus:outline-none"
          type="text"
          value={addComments}
          onChange={(e) => setAddComments(e.target.value)}
          placeholder="Add a comment..."
        />
        <div className="flex space-x-2 mt-4">
          <button
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition duration-200"
            onClick={() => setAddComments("")}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
            onClick={addTextComment}
          >
            Add Comment
          </button>
        </div>
      </div>
      {comments.map((comment, index) => (
        <Comment key={index} value={comment} />
      ))}
    </div>
  );
};

export default CommentsContainer;
