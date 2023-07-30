import {configureStore} from '@reduxjs/toolkit';
import nguoiDungSlice from './slices/nguoiDungSlice';
import movieSlice from './slices/movieSlice';
import loadingSlice from './slices/loadingSlice';

export const store = configureStore({
    reducer: {
        nguoiDung: nguoiDungSlice,
        movies: movieSlice,
        loading: loadingSlice,
    },
});