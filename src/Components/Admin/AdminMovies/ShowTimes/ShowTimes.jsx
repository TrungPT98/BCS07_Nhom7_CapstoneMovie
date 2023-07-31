import React, { useEffect, useState } from "react";
import {
  Form,
  DatePicker,
  InputNumber,
  Select,
} from "antd";
import { rapServ } from "../../../../services/rapServices";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import moment from "moment";
import { veServ } from "../../../../services/veService";
const onFinish = (values) => {
  // console.log("Success:", values);
};
const onFinishFailed = (errorInfo) => {
  // console.log("Failed:", errorInfo);
};
const ShowTimes = () => {
  const { id } = useParams();
  const formik = useFormik({
    initialValues: {
      maPhim: id,
      ngayChieuGioChieu: "",
      maRap: "",
      giaVe: "",
    },
    onSubmit: async (values) => {
      //   console.log(values);
        try{
            const res = await veServ.taoLichChieu(values)
            alert('tạo thành công', res.data.content)
        }catch(err){
            console.log(err.response?.data)
        }
    },
  });
  // set cho cả 2 giữ liệu hệ thống rạp và cụm rạp
  const [state, setState] = useState({
    heThongRapChieu: [],
    cumRapChieu: [],
  });
  console.log(state.heThongRapChieu);
  useEffect( () => {
    rapServ.getAllHeThongRap().then((res)=>{
      setState({
        ...state,
        heThongRapChieu: res.data.content
      })
    }).catch((err)=>{
      console.log(err)
    })
  }, []);

  // cascader
  const handleChangeHeThongRap = async (value) => {
    console.log("maheThong", value);
    // console.log('maheThong',options)
    // call api layThongTinRap
    try {
      const res = await rapServ.getThongTinCumRap(value);
      setState({
        ...state,
        cumRapChieu: res.data.content,
      });
      console.log(res);
    } catch (err) {
      console.log(err.response?.data);
    }
  };
  const handleChangeCumRap = (value) => {
    console.log("maCumRap", value);
    setFieldValue("maRap", value);
  };
  // datePicker
  const onOk = (values) => {
    setFieldValue(
      "ngayChieuGioChieu",
      moment(values).format("DD/MM/YYYY hh:mm:ss")
    );
    console.log(values);
  };
  const onChangeDate = (values) => {
    let ngayChieuGioChieu = moment(values);
    setFieldValue("ngayChieuGioChieu", ngayChieuGioChieu);
    console.log("values", moment(values).format("DD/MM/YYYY hh:mm:ss"));
  };

  // inputNumber
  const onChangeNumber = (value) => {
    setFieldValue("giaVe", value);
  };
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
  return (
    <Form
      onSubmitCapture={handleSubmit}
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <h3 className="text-2xl">Tạo lịch chiếu</h3>
      <Form.Item label="Hệ thống rạp">
        <Select
          placeholder="Chọn hệ thống rạp"
          className=""
          options={state.heThongRapChieu?.map((item, index) => {
            return {
              label: item.maHeThongRap,
              value: item.maHeThongRap,
            };
          })}
          onChange={handleChangeHeThongRap}
        />
      </Form.Item>

      <Form.Item label="Cụm rạp">
        <Select
          placeholder="Chọn cụm rạp"
          className=""
          options={state.cumRapChieu?.map((item, index) => ({
            label: item.maCumRap,
            value: item.maCumRap,
          }))}
          onChange={handleChangeCumRap}
        />
      </Form.Item>

      <Form.Item label="Ngày chiếu giờ chiếu">
        <DatePicker
          format={"DD/MM/YYYY hh:mm:ss"}
          showTime
          onChange={onChangeDate}
          onOk={onOk}
          placeholder="Chọn ngày giờ chiếu"
        />
      </Form.Item>

      <Form.Item label="Giá vé">
        <InputNumber min={75000} max={150000} onChange={onChangeNumber} />
      </Form.Item>

      <Form.Item label="Chức năng">
        <button type="submit" className="bg-blue-600">
          Tạo lịch chiếu
        </button>
      </Form.Item>
    </Form>
  );
};

export default ShowTimes;
