
import {configureStore} from "@reduxjs/toolkit"
import appSlice from "./appSlice";
import searchSlice from "./searchSlice";
import chatSlice from "./chatSlice";
import suggestionSearch from "./suggestionSearch";
import commentSlice from "./commentSlice";
import searchResultSlice from "./searchResultSlice";
const store = configureStore({
reducer:{
    app:appSlice,
    search:searchSlice,
    chat:chatSlice,
    suggestionSearch:suggestionSearch,
    comment:commentSlice,
    searchResult: searchResultSlice
}
});
export default store;