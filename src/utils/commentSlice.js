import { createSlice } from "@reduxjs/toolkit";

const commentSlice = createSlice({
    name:"commentSlice",
    initialState:{
        comments:[]
    },
    reducers:{
        addComment:(state, action)=>{
            state.comments=[...action.payload,...state.comments, ]
        },
    }
})

export const {addComment} = commentSlice.actions;
export default commentSlice.reducer;