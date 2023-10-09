import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
    name: "chat",
    initialState: {
        messages: []
    },
    reducers: {
        addMessage: (state,action) => {
            //to remove messages after removing certain limit
            state.messages.splice(25,1);
            state.messages.unshift(action.payload);
        },
    }
})

export const {addMessage} = chatSlice.actions;
export default chatSlice.reducer;