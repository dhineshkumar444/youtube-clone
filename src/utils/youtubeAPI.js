
export const GOOGLE_API_KEY = "AIzaSyDAELMvnwwOopIQ3-QvaELpwe_MMRf6Su8"
export const YOUTUBE_VIDEOS_API = "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=IN&key="+GOOGLE_API_KEY;

export const Suggestion_Api_Key = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=home&type=video&key="+GOOGLE_API_KEY

export const viewApi =`https://www.googleapis.com/youtube/v3/videos?key=AIzaSyDAELMvnwwOopIQ3-QvaELpwe_MMRf6Su8&fields=items(snippet(title,tags,channelTitle,publishedAt),statistics(viewCount))&part=snippet,statistics&id=`