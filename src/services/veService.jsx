import { https } from "./config";

export const veServ = {
    taoLichChieu : (data) =>{
        return https.post(`/api/QuanLyDatVe/TaoLichChieu`,data)
    }
}