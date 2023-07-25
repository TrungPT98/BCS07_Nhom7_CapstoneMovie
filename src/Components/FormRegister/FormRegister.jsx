import React, { useEffect, useState } from "react";
// import Formik
import { useFormik } from "formik";
// import yup
import * as yup from "yup";
import { Input, Space, message } from "antd";
import { nguoiDungServ } from "../../services/nguoiDungService";
import { useNavigate } from "react-router-dom";
// import sass
import "./FormRegister.scss";

const FormRegister = () => {
  // state button submit
  // const [btnSubmit, setBtnSubmit] = useState(true);
  const [messageApi, contextHolder] = message.useMessage();
  // useNavigate
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDt: "",
      maNhom: "",
      hoTen: "",
    },
     validationSchema: yup.object({
      taiKhoan: yup.string().required(),
      matKhau: yup.string().required(),
      email: yup.string().email().required(),
      soDt: yup
        .string()
        .matches(/^[0-9]*$/)
        .required(),
      maNhom: yup
        .string()
        .matches(/^[0-9]*$/)
        .required()
        .max(2),
      hoTen: yup
        .string()
        .required()
        .matches(/^[a-zA-Z\s\u00C0-\u024F\u1E00-\u1EFF]+$/),
    }),
    onSubmit: (values) => {
      
      nguoiDungServ
        .dangKy(values)
        .then((res) => {
          // console.log(res);
          messageApi.success("Đăng ký thành công.");
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        })
        .catch((err) => {
          console.log(err);
          messageApi.success("Đã có lỗi gì đó xảy ra bạn hãy thử lại.");
        });
    },
  });

  const { handleSubmit, handleChange, errors, touched, handleBlur } = formik;
  return (
    <>
      {contextHolder}
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit();
        }}
        className="space-y-4 md:space-y-6"
        action="#"
      >
        <div className="flex gap-7">
          <div>
            <div className="mt-5">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Tài khoản
              </label>
              <Input
                onChange={handleChange}
                onBlur={handleBlur}
                name="taiKhoan"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="...."
                status={errors.taiKhoan && touched.taiKhoan ? "error" : ""}
              />
            </div>
            <div className="mt-5">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Mật khẩu
              </label>
              <Input
                onChange={handleChange}
                onBlur={handleBlur}
                name="matKhau"
                type="password"
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray
                -600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                status={errors.matKhau && touched.matKhau ? "error" : ""}
              />
            </div>
            <div className="mt-5">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Email
              </label>
              <Input
                onChange={handleChange}
                onBlur={handleBlur}
                name="email"
                id="email"
                placeholder="ray@gmail.com"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray
                -600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                status={errors.email && touched.email ? "error" : ""}
              />
            </div>
          </div>
          <div>
            <div className="mt-5">
              <label
                htmlFor="phone"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Số điện thoại
              </label>
              <Input
                name="soDt"
                type=""
                onChange={handleChange}
                onBlur={handleBlur}
                id="phone"
                placeholder="093...."
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                status={errors.soDt && touched.soDt ? "error" : ""}
              />
            </div>
            <div className="mt-5">
              <label
                htmlFor="maNhom"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Mã nhóm
              </label>
              <Input
                name="maNhom"
                type=""
                onChange={handleChange}
                onBlur={handleBlur}
                id="maNhom"
                placeholder="02"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                status={errors.maNhom && touched.maNhom ? "error" : ""}
              />
            </div>
            <div className="mt-5">
              <label
                htmlFor="hoTen"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Họ tên
              </label>
              <Input
                onChange={handleChange}
                onBlur={handleBlur}
                name="hoTen"
                type=""
                id="hoTen"
                placeholder="Phúc"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                status={errors.hoTen && touched.hoTen ? "error" : ""}
              />
            </div>
          </div>
        </div>
        <div className="flex items-start"></div>
        <button
          type="submit"
          className='w-full text-white bg-sky-500  font-medium rounded-lg text-sm px-5 py-3 text-center ease-linear duration-200
           hover:bg-sky-700'
          
        >
          Đăng ký
        </button>
        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
          Bạn đã có tài khoản?{" "}
          <button
            onClick={() => {
              navigate("/login");
            }}
            className="font-medium text-primary-600 hover:underline dark:text-primary-500"
          >
            Đăng nhập
          </button>
        </p>
      </form>
    </>
  );
};

export default FormRegister;
