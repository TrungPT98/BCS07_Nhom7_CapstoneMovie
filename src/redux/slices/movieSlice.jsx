import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// createAsynThunk xử lý bất đồng bộ
// export const getAllUserThunk = createAsyncThunk(
//     "nguoiDung/getAllUser",
//     async () => {
//       const res = await nguoiDungServ.getAllUser();
//       return res.data.content;
//     }
//   );
const initialState = {
    movies: [],
  };
// setup reduxtoolkit
export const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers:{

    }
})  

// export const
 export default moviesSlice.reducer
