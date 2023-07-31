import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  TreeSelect,
  message,
} from "antd";
import moment from "moment/moment";
import { useDispatch } from "react-redux";
import { addNewMovieAction } from "../../../../../redux/actions/QuanLyMovies";
const FormAddMoive = () => {
  // import message antdesgin
  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: "success",
      content: "This is a success message",
    });
  };

  // useDispatch
  const dispatch = useDispatch();
  const [componentSize, setComponentSize] = useState("default");
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  const formik = useFormik({
    initialValues: {
      maNhom: "GP10",
      tenPhim: "",
      trailer: "",
      moTa: "",
      ngayKhoiChieu: moment(),
      sapChieu: false,
      dangChieu: false,
      hot: false,
      danhGia: 2,
      hinhAnh: null,
    },
    onSubmit: async (values, { resetForm }) => {
      
      //   console.log(values);
      // tạo formData theo yêu cầu api
      let formData = new FormData();
      for (let key in values) {
        if (key !== "hinhAnh") {
          formData.append(key, values[key]);
        } else {
          formData.append("File", values.hinhAnh, values.hinhAnh.name);
        }
      }
      try {
        //   gửi dữ liệu api
        await dispatch(addNewMovieAction(formData));
        messageApi.success("Thêm phim thành công");

        resetForm({
          ...formik.initialValues,
          ngayKhoiChieu: moment(),
          hinhAnh: null,
        });
      } catch (err) {
        messageApi.error("Đã xảy ra lỗi khi thêm phim");
      }
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
    let ngayKhoiChieu = moment(value).format("DD/MM/YYYY");
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
  const [imgSrc, setImgSrc] = useState(null);
  const handleChangeFile = (e) => {
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
      {contextHolder}
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
        <h3>Thêm mới phim</h3>
        <Form.Item label="Form Size" name="size">
          <Radio.Group>
            <Radio.Button value="small">Small</Radio.Button>
            <Radio.Button value="default">Default</Radio.Button>
            <Radio.Button value="large">Large</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Tên phim">
          <Input
            value={values.tenPhim}
            onChange={handleChange}
            onBlur={handleBlur}
            name="tenPhim"
          />
          {errors.tenPhim && touched.tenPhim ? (
            <p className="text-red-700">{errors.tenPhim}</p>
          ) : (
            ""
          )}
        </Form.Item>
        <Form.Item label="Trailer">
          <Input
            value={values.trailer}
            onChange={handleChange}
            onBlur={handleBlur}
            name="trailer"
          />
          {errors.trailer && touched.trailer ? (
            <p className="text-red-700">{errors.trailer}</p>
          ) : (
            ""
          )}
        </Form.Item>
        <Form.Item label="Mô tả">
          <Input
            value={values.moTa}
            onChange={handleChange}
            onBlur={handleBlur}
            name="moTa"
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
          />
          {errors.ngayKhoiChieu && touched.ngayKhoiChieu ? (
            <p className="text-red-700">{errors.ngayKhoiChieu}</p>
          ) : (
            ""
          )}
        </Form.Item>
        <Form.Item label="Sắp chiếu" valuePropName="checked">
          <Switch
            checked={values.sapChieu}
            name="sapChieu"
            onChange={handleChangeSwitch("sapChieu")}
          />
        </Form.Item>
        <Form.Item label="Đang chiếu" valuePropName="checked">
          <Switch
            checked={values.dangChieu}
            name="dangChieu"
            onChange={handleChangeSwitch("dangChieu")}
          />
        </Form.Item>
        <Form.Item label="Hot" valuePropName="checked">
          <Switch
            checked={values.hot}
            name="hot"
            onChange={handleChangeSwitch("hot")}
          />
        </Form.Item>
        <Form.Item label="Đánh giá">
          <InputNumber
            value={values.danhGia}
            min={1}
            max={10}
            onChange={handleChangeInputNumber("danhGia")}
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
            src={imgSrc}
            alt="..."
          />
        </Form.Item>
        <Form.Item label="">
          <button
            className="text-white bg-blue-700  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center hover:bg-blue-800"
            type="submit"
          >
            Thêm mới
          </button>
        </Form.Item>
      </Form>
    </>
  );
};

export default FormAddMoive;
