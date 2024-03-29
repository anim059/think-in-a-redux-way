const store = require("./app/store");

const fetchVideos = require("./features/videosSlice");

store.subscribe(()=>{
    console.log(store.getState());
})

store.dispatch(fetchVideos);