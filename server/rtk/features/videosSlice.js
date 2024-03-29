const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const fetch = require("node-fetch");

const initialState = {
    loading: false,
    videos: [],
    error: ""
}

const fetchVideos = createAsyncThunk("video/fetchVideos", async() => {
    const responce = await fetch("http://localhost:9000/videos");
    const videos = await responce.json();
    return videos;
})


const videoSlice = createSlice({
    name : "videos",
    initialState,
    extraReducers : (builder) => {
        builder.addCase(fetchVideos.pending, (state, action)=>{
            state.loading = true,
            state.error = ""
        }),
        builder.addCase(fetchVideos.fulfilled, (state, action)=>{
            state.loading = false;
            state.videos = action.payload;
            state.error = ""
        }),
        builder.addCase(fetchVideos.rejected, (state, action)=>{
            state.loading = false;
            state.videos = [];
            state.error = action.error.message
        })
    }
})

module.exports = videoSlice.reducer;
module.exports.fetchVideos = fetchVideos;