import { https } from "./config";

export const rapServ = {
  // lấy thông tin hệ thống rạp
  getAllHeThongRap: () => {
    return https.get("/api/QuanLyRap/LayThongTinHeThongRap");
  },
  getAllLichChieuHeThong: (maHeThong) => {
    return https.get(
      `/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maHeThongRap=${maHeThong}&maNhom=GP09`
    );
  },
  getThongTinCumRap: (maHeThongRap) => {
    return https.get(`/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`);
  },  
};
