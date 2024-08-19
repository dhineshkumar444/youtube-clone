
import {configureStore} from "@reduxjs/toolkit"
import appSlice from "./appSlice";
import searchSlice from "./searchSlice";
import chatSlice from "./chatSlice";
import suggestionSearch from "./suggestionSearch";
const store = configureStore({
reducer:{
    app:appSlice,
    search:searchSlice,
    chat:chatSlice,
    suggestionSearch:suggestionSearch
}
});
export default store;