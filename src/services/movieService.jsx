import { https } from "./config";

export const movieServ = {
  getAllBanner: () => {
    return https.get("/api/QuanLyPhim/LayDanhSachBanner");
  },
  getAllMovie: () => {
    return https.get("/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP09");
  },
  addNewMovie: (formData) => {
    return https.post("/api/QuanLyPhim/ThemPhimUploadHinh", formData);
  },
  getInfoMovie: (maPhim) => {
    return https.get(`/api/QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`);
  },
  updateMovie: (formData) => {
    return https.post(`/api/QuanLyPhim/CapNhatPhimUpload`,formData)
  }
};
