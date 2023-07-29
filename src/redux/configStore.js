import {configureStore} from '@reduxjs/toolkit';
import nguoiDungSlice from './slices/nguoiDungSlice';
import movieSlice from './slices/movieSlice';

export const store = configureStore({
    reducer: {
        nguoiDung: nguoiDungSlice,
        movies: movieSlice,
    },
});