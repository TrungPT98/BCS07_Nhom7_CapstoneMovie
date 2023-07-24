import { createSlice } from "@reduxjs/toolkit";
import { layDuLieuLocal } from "../../utils/localStore";

const initialState = {
    name: layDuLieuLocal("user")
};
// setup reduxtoolkit
export const nguoiDungSlice = createSlice({
  name: "nguoiDung",
  initialState,
  reducers: {
    // tạo 1 phương thức xử lý state bên trên store redux 
    setName: (state, action) => {
        //check name có dữ liệu hay không
        if(state.name == ''){
            // useDispatch
            state.name = action.payload;
        }
    }
  },
});

// sử dụng phương thức trong {} dưới component
export const {setName} = nguoiDungSlice.actions;

// import vào store redux
export default nguoiDungSlice.reducer;
