import { https } from "./config";

export const rapServ = {
  // lấy thông tin hệ thống rạp
  getAllHeThongRap: () => {
    return https.get("/api/QuanLyRap/LayThongTinHeThongRap");
  },
  getAllLichChieuHeThong: (maHeThong) => {
    return https.get(
      `/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maHeThongRap=${maHeThong}&maNhom=GP10`
    );
  },
  getThongTinCumRap: (maHeThongRap) => {
    return https.get(`/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`);
  },  
};
  getLichChieuPhim: (maPhim) => {
    return https.get(
      `https://movienew.cybersoft.edu.vn/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`
    )
  }
};

