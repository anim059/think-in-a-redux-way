const store = require("./app/store");

const {fetchVideos} = require("./features/videosSlice");
const {fetchRelatedVideos} = require("./features/videosSlice");



store.subscribe(()=>{
    console.log(store.getState().video.videos);
})

store.dispatch(fetchVideos());
// console.log("stores",store.getState());
// store.dispatch(fetchRelatedVideos('react'));
