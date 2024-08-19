import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const searchSlice = createSlice({
    name:"Search",
    initialState:{

    }, reducers:{
        cacheResults:(state, action)=>{
         state = Object.assign(state, action.payload)     
        }
    }
})
 export const {cacheResults} = searchSlice.actions
export default searchSlice.reducer