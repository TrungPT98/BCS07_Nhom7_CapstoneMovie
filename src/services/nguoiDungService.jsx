// import https from config
import {https} from './config'
export const nguoiDungServ = {
    dangNhap: (data) => {
        return https.post('/api/QuanLyNguoiDung/DangNhap', data) 
    },
    dangKy: (data)=>{
        return https.post('/api/QuanLyNguoiDung/DangKy', data)
    }
}