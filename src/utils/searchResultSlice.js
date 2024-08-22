import { createSlice } from "@reduxjs/toolkit";

const searchResultSlice = createSlice({
    name:"searchResultSlice",
    initialState:{
        value:"",
    },
    reducers:{
        updateSearch:(state, action)=>{
state.value =action.payload
        }
    }
})

export const {updateSearch} =searchResultSlice.actions;
export default searchResultSlice.reducer