const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const fetch = require("node-fetch");

const initialState = {
    loading: false,
    videos: [],
    error: ""
}

const fetchVideos = createAsyncThunk("video/fetchVideos", async(arg, thunkAPI) => {
    const responce = await fetch("http://localhost:9000/videos");
    const videos = await responce.json();
    let queryParam = videos.tags.reduce((init, value)=>{
        return init + `tags_like=${value}&`
    },"");
    thunkAPI.dispatch(fetchRelatedVideos(queryParam));
    return videos;
})

const fetchRelatedVideos = createAsyncThunk("relatedVideo/fetchRelatedVideos", async(queryParam, thunkAPI)=>{
    const responce = await fetch(`http://localhost:9000/videos?${queryParam}`);
    videos = await responce.json()
    return videos.sort((a,b)=>{
        const viewA = a.views.slice(0,a.views.length - 1);
        const viewB = b.views.slice(0,b.views.length - 1);
        if(viewA > viewB){
            return 1
        }
        if(viewA < viewB){
            return -1
        }
        return 0;
    })
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
        }),
        builder.addCase(fetchRelatedVideos.pending, (state, action)=>{
            state.loading = true,
            state.error = ""
        }),
        builder.addCase(fetchRelatedVideos.fulfilled, (state, action)=>{
            state.loading = false;
            state.videos = action.payload;
            state.error = ""
        }),
        builder.addCase(fetchRelatedVideos.rejected, (state, action)=>{
            state.loading = false;
            state.videos = [];
            state.error = action.error.message
        })
    }
})

module.exports = videoSlice.reducer;
module.exports.fetchVideos = fetchVideos;
module.exports.fetchRelatedVideos = fetchRelatedVideos;
