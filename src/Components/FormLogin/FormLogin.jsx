import React from "react";
// import Formik
import { useFormik } from "formik";
// import yup
import * as yup from "yup";
// import antdesign
import { message } from "antd";
import { nguoiDungServ } from "../../services/nguoiDungService";
import { luuXuongLocal } from "../../utils/localStore";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setName } from "../../redux/slices/nguoiDungSlice";
const FormLogin = () => {
  // useNavigate
  const navigate = useNavigate();
  //useDispatch
  const dispatch = useDispatch();
  // message from ant design
  const [messageApi, contextHolder] = message.useMessage();
  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
    },
    // values là dữ liệu từ input
    onSubmit: (values) => {
      //   console.log(values);

      // gửi dữ liệu lên server
      nguoiDungServ
        .dangNhap(values)
        .then((res) => {
          console.log(res);
          if (res.data.content.maLoaiNguoiDung === "QuanTri") {
            messageApi.success("Đăng nhập thành công.");
            // login thành công, lưu thông tin xuống local
            luuXuongLocal("user", res.data.content);
            // lưu thành công sẽ gửi dữ liệu lên redux
            dispatch(setName(res.data.content));

            //   set thời gian để thông báo message
            setTimeout(() => {
              navigate("/admin");
            }, 2000);
          } else {
            messageApi.success("Đăng nhập thành công.");
            // login thành công, lưu thông tin xuống local
            luuXuongLocal("user", res.data.content);
            // lưu thành công sẽ gửi dữ liệu lên redux
            dispatch(setName(res.data.content));

            //   set thời gian để thông báo message
            setTimeout(() => {
              navigate("/");
            }, 2000);
          }
        })
        .catch((err) => {
          console.log(err);
          messageApi.error(err.response.data.content);
          // clear input khi nhập sai tk hoặc mk
          formik.resetForm();
        });
    },
    // dùng thư viện yup để validate
    validationSchema: yup.object({
      taiKhoan: yup
        .string()
        .required("Vui lòng cung cấp thông tin bắt buộc trước khi tiếp tục."),
      matKhau: yup
        .string()
        .required("Vui lòng cung cấp thông tin bắt buộc trước khi tiếp tục."),
    }),
  });
  //   bóc tách
  const { handleSubmit, handleChange, errors, touched, handleBlur } = formik;
  return (
    <>
      {contextHolder}
      <div className="lg:w-1/2 xl:max-w-screen-sm">
        <div className="py-12 bg-indigo-100 lg:bg-white flex justify-center lg:justify-start lg:px-12">
          <div className="cursor-pointer flex items-center">
            <div>
              <svg
                className="w-10 text-indigo-500"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                version="1.1"
                id="Layer_1"
                x="0px"
                y="0px"
                viewBox="0 0 225 225"
                style={{ enableBackground: "new 0 0 225 225" }}
                xmlSpace="preserve"
              >
                <style
                  type="text/css"
                  dangerouslySetInnerHTML={{
                    __html:
                      "\n                            .st0{fill:none;stroke:currentColor;stroke-width:20;stroke-linecap:round;stroke-miterlimit:3;}\n                        ",
                  }}
                />
                <g transform="matrix( 1, 0, 0, 1, 0,0) ">
                  <g>
                    <path
                      id="Layer0_0_1_STROKES"
                      className="st0"
                      d="M173.8,151.5l13.6-13.6 M35.4,89.9l29.1-29 M89.4,34.9v1 M137.4,187.9l-0.6-0.4     M36.6,138.7l0.2-0.2 M56.1,169.1l27.7-27.6 M63.8,111.5l74.3-74.4 M87.1,188.1L187.6,87.6 M110.8,114.5l57.8-57.8"
                    />
                  </g>
                </g>
              </svg>
            </div>
            <div className="text-2xl text-indigo-800 tracking-wide ml-2 font-semibold">
              Cyber Movies
            </div>
          </div>
        </div>
        <div className="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl">
          <h2
            className="text-center text-3xl text-indigo-900 font-display font-semibold lg:text-left xl:text-5xl
      xl:text-bold"
          >
            Đăng nhập vào hệ thống
          </h2>
          <div
            onSubmit={(event) => {
              event.preventDefault();
              handleSubmit();
            }}
            className="mt-12"
          >
            <form>
              <div>
                <div className="text-sm font-bold text-gray-700 tracking-wide">
                  Tài khoản
                </div>
                <input
                  //phương thức handleBlur trong formik
                  onBlur={handleBlur}
                  //phương thức handleChange trong formik
                  onChange={handleChange}
                  className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                  type
                  name="taiKhoan"
                  placeholder="nhập tài khoản..."
                  // phương thức formik.values.
                  value={formik.values.taiKhoan}
                />
                {/* formik.errors */}
                {/* check khi người dùng nhập vô rồi mới báo lỗi (dùng touched) nếu không dùng sẽ báo lỗi khi chúng ta không đụng vào input */}
                {errors.taiKhoan && touched.taiKhoan ? (
                  <p className="text-red-700">{errors.taiKhoan}</p>
                ) : (
                  ""
                )}
              </div>
              <div className="mt-8">
                <div className="flex justify-between items-center">
                  <div className="text-sm font-bold text-gray-700 tracking-wide">
                    Mật Khẩu
                  </div>
                </div>
                <input
                  //phương thức handleBlur trong formik
                  onBlur={handleBlur}
                  //phương thức handleChange trong formik
                  onChange={handleChange}
                  className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                  type="password"
                  name="matKhau"
                  placeholder="Nhập mật khẩu..."
                  // phương thức formik.values.
                  value={formik.values.matKhau}
                />
                {/* formik.errors */}
                {/* check khi người dùng nhập vô rồi mới báo lỗi (dùng touched) nếu không dùng sẽ báo lỗi khi chúng ta không đụng vào input */}
                {errors.matKhau && touched.matKhau ? (
                  <p className="text-red-700">{errors.matKhau}</p>
                ) : (
                  ""
                )}
              </div>
              <div className="mt-10">
                <button
                  type="submit"
                  className="bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide
                  font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
                  shadow-lg"
                >
                  Đăng nhập
                </button>
              </div>
            </form>
            <div className="mt-12 text-sm font-display font-semibold text-gray-700 text-center">
              Bạn chưa có tài khoản ?{" "}
              <button
                onClick={() => {
                  navigate("/register");
                }}
                className="cursor-pointer text-indigo-600 hover:text-indigo-800"
              >
                Đăng ký
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
    //phương thức onSubmit trong formik
  );
};

export default FormLogin;
