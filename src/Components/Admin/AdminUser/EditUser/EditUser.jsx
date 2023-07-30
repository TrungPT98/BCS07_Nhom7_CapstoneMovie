import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
// import Formik
// import yup
import * as yup from "yup";
import { nguoiDungServ } from "../../../../services/nguoiDungService";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Space, Table, Tag, Button, Modal, message } from "antd";
import {
  getInfoUserAction,
  updateInfoUserAction,
} from "../../../../redux/actions/QuanLyUser";
const EditUser = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();
  const { taiKhoan } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (taiKhoan) {
      dispatch(getInfoUserAction(taiKhoan));
    }
  }, []);
  const { infoUser } = useSelector((state) => state.nguoiDung);
  // console.log(infoUser)
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      taiKhoan: infoUser.taiKhoan,
      matKhau: infoUser?.matKhau,
      email: infoUser?.email,
      soDT: infoUser.soDT,
      maNhom: infoUser?.maNhom,
      maLoaiNguoiDung: infoUser?.maLoaiNguoiDung,
      hoTen: infoUser?.hoTen,
    },
    onSubmit: (values) => {
      //   console.log(values)

      dispatch(updateInfoUserAction(values));
      messageApi.success("thành công");
    },
    validationSchema: yup.object({
      taiKhoan: yup
        .string()
        .required("Vui lòng cung cấp thông tin bắt buộc trước khi tiếp tục."),
      matKhau: yup
        .string()
        .required("Vui lòng cung cấp thông tin bắt buộc trước khi tiếp tục."),
      email: yup
        .string()
        .email("Vui lòng kiểm tra lại định dạng email")
        .required("Vui lòng cung cấp thông tin bắt buộc trước khi tiếp tục."),
      soDT: yup
        .string()
        .matches(/^[0-9]*$/, "Vui lòng không nhập chữ")
        .required("Vui lòng cung cấp thông tin bắt buộc trước khi tiếp tục."),
      maNhom: yup
        .string()
        .required("Vui lòng cung cấp thông tin bắt buộc trước khi tiếp tục.")
        .min(4, "Tối đa là 4 ký tự, vd: GP03")
        .max(4, "Tối đa là 4 ký tự, vd: GP03"),
      hoTen: yup
        .string()
        .required("Vui lòng cung cấp thông tin bắt buộc trước khi tiếp tục.")
        .matches(
          /^[a-zA-Z\s\u00C0-\u024F\u1E00-\u1EFF]+$/,
          "Vui lòng không nhập số"
        ),
    }),
  });
  //   bóc tách
  const { handleSubmit, handleChange, errors, touched, handleBlur, values } =
    formik;

  return (
    <div>
      {contextHolder}
      <form onSubmitCapture={handleSubmit}>
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="text"
            name="taiKhoan"
            id="taiKhoan"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.taiKhoan}
          />
          <label
            for="taiKhoan"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Tài khoản
          </label>
          {errors.taiKhoan && touched.taiKhoan ? (
            <p className="text-red-700">{errors.taiKhoan}</p>
          ) : (
            ""
          )}
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="matKhau"
            name="matKhau"
            id="matKhau"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.matKhau}
          />
          <label
            for="matKhau"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Mật khẩu
          </label>
          {errors.matKhau && touched.matKhau ? (
            <p className="text-red-700">{errors.matKhau}</p>
          ) : (
            ""
          )}
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="text"
            name="email"
            id="email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            onBlur={handleBlur}
            placeholder=" "
            onChange={handleChange}
            value={values.email}
          />
          <label
            for="email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email
          </label>
          {errors.email && touched.email ? (
            <p className="text-red-700">{errors.email}</p>
          ) : (
            ""
          )}
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type=""
              name="soDT"
              id="soDT"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.soDT}
            />
            <label
              for="soDT"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Số điện thoại
            </label>
            {errors.soDT && touched.soDT ? (
              <p className="text-red-700">{errors.soDT}</p>
            ) : (
              ""
            )}
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="maNhom"
              id="maNhom"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.maNhom}
            />
            <label
              for="maNhom"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Mã nhóm
            </label>
            {errors.maNhom && touched.maNhom ? (
              <p className="text-red-700">{errors.maNhom}</p>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full  group">
            <select
              onChange={handleChange}
              value={values.maLoaiNguoiDung}
              name="maLoaiNguoiDung"
              id="countries"
              className=" text-gray-400 text-sm py-2.5   block w-full border-0 border-b-2 border-black transparent peer"
            >
              <option value="" selected>
                Chọn loại người dùng
              </option>
              <option value="KhachHang">Khách hàng</option>
              <option value="QuanTri">Quản trị</option>
            </select>
            {errors.maLoaiNguoiDung && touched.maLoaiNguoiDung ? (
              <p className="text-red-700">{errors.maLoaiNguoiDung}</p>
            ) : (
              ""
            )}
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="hoTen"
              id="hoTen"
              className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer text-black"
              placeholder=" "
              onChange={handleChange}
              value={values.hoTen}
              onBlur={handleBlur}
            />
            <label
              for="hoTen"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Họ và tên
            </label>
            {errors.hoTen && touched.hoTen ? (
              <p className="text-red-700">{errors.hoTen}</p>
            ) : (
              ""
            )}
          </div>
        </div>
        <Button
          htmlType="submit"
          className={`text-white bg-blue-700  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center 
            hover:bg-blue-800
          `}
        >
          Cập nhật
        </Button>
      </form>
    </div>
  );
};

export default EditUser;
