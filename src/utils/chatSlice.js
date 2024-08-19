import { createSlice } from "@reduxjs/toolkit";


const chatSlice = createSlice({
    name:"chat",
    initialState:{
messages:[],
    },
    reducers:{
        updateChat:(state, action)=>{
            state.messages.splice(10,1)
       state.messages.unshift(action.payload);
        }
    }
})

export const {updateChat} = chatSlice.actions;
export default chatSlice.reducer;
