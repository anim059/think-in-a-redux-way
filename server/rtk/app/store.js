const configureStore = require("@reduxjs/toolkit").configureStore;
const { createLogger } = require("redux-logger");

const videoReducer = require("../features/videosSlice")


const logger = createLogger();

const store = configureStore({
    reducer : {
        video : videoReducer
    },
    middleware : (getDefaultMiddlewares) => {
        return getDefaultMiddlewares().concat(logger);
    }
})

module.exports = store;