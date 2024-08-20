import { createSlice } from "@reduxjs/toolkit";
import { GOOGLE_API_KEY, YOUTUBE_VIDEOS_API } from "./youtubeAPI";


const suggestionSearch = createSlice({
    name:"suggestion",
initialState:{
    search:YOUTUBE_VIDEOS_API,
},
reducers:{
    searchMostPopular:(state, action)=>{
state.search = YOUTUBE_VIDEOS_API;
    },
    searchSuggestion:(state, action)=>{
        state.search=`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=${action.payload}&type=video&key=${GOOGLE_API_KEY}`
    }
}

})
export const {searchMostPopular, searchSuggestion} = suggestionSearch.actions
export default suggestionSearch.reducer;