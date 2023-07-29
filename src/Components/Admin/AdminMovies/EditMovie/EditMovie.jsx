import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { DatePicker, Form, Input, InputNumber, Radio, Switch } from "antd";
import moment from "moment/moment";
import { useDispatch, useSelector } from "react-redux";
import {
  getInfoMovieAction,
  updateMovieAction,
} from "../../../../redux/actions/QuanLyMovies";
import { useNavigate, useParams, useHistory } from "react-router-dom";

const EditMovie = () => {
  // useNavigate

  // useDispatch
  const dispatch = useDispatch();
  //   phương thức lấy id bằng useParams()
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(getInfoMovieAction(id));
    }
  }, [id]);
  const { infoMovie } = useSelector((state) => state.movies);
  //   console.log(infoMovie);
  const [componentSize, setComponentSize] = useState("default");
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      maPhim: infoMovie.maPhim,
      tenPhim: infoMovie?.tenPhim,
      trailer: infoMovie?.trailer,
      moTa: infoMovie?.moTa,
      ngayKhoiChieu: infoMovie?.ngayKhoiChieu,
      sapChieu: infoMovie?.sapChieu,
      dangChieu: infoMovie?.dangChieu,
      hot: infoMovie?.hot,
      danhGia: infoMovie?.danhGia,
      hinhAnh: null,
    },
    onSubmit: (values) => {
      console.log(values);
      // tạo formData theo yêu cầu api
      let formData = new FormData();
      for (let key in values) {
        if (key !== "hinhAnh") {
          formData.append(key, values[key]);
        } else {
          if (values.hinhAnh != null) {
            formData.append("File", values.hinhAnh, values.hinhAnh.name);
          }
        }
      }
      //   cập nhật dữ liệu api
      dispatch(updateMovieAction(formData));
    },
    validationSchema: yup.object({
      tenPhim: yup
        .string()
        .required("Vui lòng cung cấp thông tin bắt buộc trước khi tiếp tục."),
      trailer: yup
        .string()
        .required("Vui lòng cung cấp thông tin bắt buộc trước khi tiếp tục."),
      moTa: yup
        .string()
        .required("Vui lòng cung cấp thông tin bắt buộc trước khi tiếp tục."),
      ngayKhoiChieu: yup
        .string()
        .required("Vui lòng cung cấp thông tin bắt buộc trước khi tiếp tục."),
      danhGia: yup
        .number()
        .min(1, "Nhỏ nhất là 1")
        .max(10, "Tối đa là 10")
        .required("Vui lòng cung cấp thông tin bắt buộc trước khi tiếp tục."),
    }),
  });
  //   bóc tách
  const {
    handleSubmit,
    handleChange,
    errors,
    touched,
    handleBlur,
    values,
    setFieldValue,
  } = formik;

  // handleChange datepicker
  const handleChangeDatePicker = (value) => {
    console.log(moment);
    let ngayKhoiChieu = moment(value);
    setFieldValue("ngayKhoiChieu", ngayKhoiChieu);
  };

  // handleChange switch
  const handleChangeSwitch = (name) => {
    return (value) => setFieldValue(name, value);
  };
  // handleChange number
  const handleChangeInputNumber = (name) => {
    return (value) => {
      setFieldValue(name, value);
    };
  };
  // handeChange type file
  const [imgSrc, setImgSrc] = useState("");
  const handleChangeFile =  (e) => {
    // lấy file từ event
    let file = e.target.files[0];
    if (
      file.type === "image/png" ||
      file.type === "image/gif" ||
      file.type === "image/jpeg"
    ) {
        // tạo đối tượng đoc file
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
            setImgSrc(e.target.result);
        };
    }
    // lấy dữ liệu lưu vào formik
     setFieldValue("hinhAnh", file);
  };

  return (
    <>
      <Form
        onSubmitCapture={handleSubmit}
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        initialValues={{
          size: componentSize,
        }}
        onValuesChange={onFormLayoutChange}
        size={componentSize}
        style={{
          maxWidth: 600,
        }}
      >
        <h3>Chỉnh sửa phim</h3>
        <Form.Item label="Form Size" name="size">
          <Radio.Group>
            <Radio.Button value="small">Small</Radio.Button>
            <Radio.Button value="default">Default</Radio.Button>
            <Radio.Button value="large">Large</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Tên phim">
          <Input
            onChange={handleChange}
            onBlur={handleBlur}
            name="tenPhim"
            value={formik.values.tenPhim}
          />
          {errors.tenPhim && touched.tenPhim ? (
            <p className="text-red-700">{errors.tenPhim}</p>
          ) : (
            ""
          )}
        </Form.Item>
        <Form.Item label="Trailer">
          <Input
            onChange={handleChange}
            onBlur={handleBlur}
            name="trailer"
            value={formik.values.trailer}
          />
          {errors.trailer && touched.trailer ? (
            <p className="text-red-700">{errors.trailer}</p>
          ) : (
            ""
          )}
        </Form.Item>
        <Form.Item label="Mô tả">
          <Input
            onChange={handleChange}
            onBlur={handleBlur}
            name="moTa"
            value={formik.values.moTa}
          />
          {errors.moTa && touched.moTa ? (
            <p className="text-red-700">{errors.moTa}</p>
          ) : (
            ""
          )}
        </Form.Item>
        <Form.Item label="Ngày chiếu">
          <DatePicker
            format={"DD/MM/YYYY"}
            onChange={handleChangeDatePicker}
            //   vì đây là moment nên phải dùng moment ép kiểu lại và ta phải đặt lại format
            value={moment(formik.values.ngayKhoiChieu)}
          />
          {errors.ngayKhoiChieu && touched.ngayKhoiChieu ? (
            <p className="text-red-700">{errors.ngayKhoiChieu}</p>
          ) : (
            ""
          )}
        </Form.Item>
        <Form.Item label="Sắp chiếu" valuePropName="checked">
          <Switch
            name="sapChieu"
            onChange={handleChangeSwitch("sapChieu")}
            checked={formik.values.sapChieu}
          />
        </Form.Item>
        <Form.Item label="Đang chiếu" valuePropName="checked">
          <Switch
            name="dangChieu"
            onChange={handleChangeSwitch("dangChieu")}
            checked={formik.values.dangChieu}
          />
        </Form.Item>
        <Form.Item label="Hot" valuePropName="checked">
          <Switch
            name="hot"
            onChange={handleChangeSwitch("hot")}
            checked={formik.values.hot}
          />
        </Form.Item>
        <Form.Item label="Đánh giá">
          <InputNumber
            min={1}
            max={10}
            onChange={handleChangeInputNumber("danhGia")}
            value={formik.values.danhGia}
          />
          {errors.danhGia && touched.danhGia ? (
            <p className="text-red-700">{errors.danhGia}</p>
          ) : (
            ""
          )}
        </Form.Item>
        <Form.Item label="Hình ảnh">
          <Input className="p-0" type="file" onChange={handleChangeFile} />
          <br />
          <img
            accept="image/png, image/gif, image/jpeg"
            className="w-20 h-20"
            // nếu dữ liệu ban đầu là  rỗng thì sẽ set hình mặc định lấy về
            src={imgSrc === "" ? infoMovie.hinhAnh : imgSrc}
            alt="..."
          />
        </Form.Item>
        <Form.Item label="">
          <button
            className="text-white bg-blue-700  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center hover:bg-blue-800"
            type="submit"
          >
            Cập nhật
          </button>
        </Form.Item>
      </Form>
    </>
  );
};

export default EditMovie;
