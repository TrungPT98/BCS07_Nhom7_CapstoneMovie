import { nguoiDungServ } from "../../services/nguoiDungService"
import { getInfoUser } from "../slices/nguoiDungSlice"
import { message } from "antd";

export const getInfoUserAction = (taiKhoan) =>{
    return async (dispatch) => {
        try{
            const result = await nguoiDungServ.getInfoUser(taiKhoan)
            // console.log(result.data.content)
            dispatch(getInfoUser(result.data.content))
        }catch(err){
            console.log(err.response?.data)
        }
    }
}

export const updateInfoUserAction = (formData) =>{
    return async (dispatch) => {
        try{
            const result = await nguoiDungServ.updateInfoUser(formData)
            console.log(result.data.content)
            alert('asdas')
        }catch(err){
            console.log(err.response?.data)

        }
    }
}