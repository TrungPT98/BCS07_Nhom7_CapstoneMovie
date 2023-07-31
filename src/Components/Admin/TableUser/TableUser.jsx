import React, { useState } from "react";
// import ant design
import { Space, Table, Tag, Button, Modal, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { nguoiDungServ } from "../../../services/nguoiDungService";
import { getAllUserThunk } from "../../../redux/slices/nguoiDungSlice";
import { NavLink } from "react-router-dom";
const { confirm } = Modal;
// const showConfirm = () => {
//   confirm({
//     title: "Do you Want to delete these items?",
//     icon: <ExclamationCircleFilled />,
//     content: "Some descriptions",
//     onOk() {
//       console.log("OK");
//     },
//     onCancel() {
//       console.log("Cancel");
//     },
//   });
// };
const TableUser = () => {
  // message antdesign
  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'This is a success message',
    });
  };
  const error = () => {
    messageApi.open({
      type: 'error',
      content: 'This is an error message',
    });
  };  


  const dispatch = useDispatch();
  // lấy dữ liệu từ store
  const { users } = useSelector((state) => state.nguoiDung);
  //   console.log(users);
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Tài khoản",
      dataIndex: "taiKhoan",
      key: "taiKhoan",
    },
    {
      title: "Họ tên",
      dataIndex: "hoTen",
      key: "hoTen",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "soDT",
      key: "soDT",
    },
    {
      title: "Loại người dùng",
      dataIndex: "maLoaiNguoiDung",
      key: "maLoaiNguoiDung",
      render: (text, record, index) => {
        // console.log(text);
        // console.log(record);
        // console.log(index);
        if (text == "QuanTri") {
          return <Tag color="gold">Quản trị</Tag>;
        } else {
          return <Tag color="cyan">Khách hàng</Tag>;
        }
      },
    },

    {
      title: "Action",
      key: "action",
      render: (text, record,index) => (
        <Space size="middle">
          <button
            onClick={() => {
              nguoiDungServ
                .deleteUser(record.taiKhoan)
                .then((res) => {
                  // console.log(res)
                  success()
                  dispatch(getAllUserThunk())
                })
                .catch((err) => {
                  // console.log(err);
                  error()
                });
            }}
            className="py-2 px-5 bg-red-600 text-white rounded-lg hover:bg-red-400 duration-300"
          >
            Xoá
          </button>

          <NavLink key={2} to={`/admin/update/${record.taiKhoan}`}   className="py-2 px-5 bg-yellow-600 text-white rounded-lg hover:bg-yellow-400 duration-300 hover:text-white">
            Sửa
          </NavLink>
        </Space>
      ),
    },
  ];
  //   const data = [
  //     {
  //       key: "1",
  //       name: "John Brown",
  //       age: 32,
  //       address: "New York No. 1 Lake Park",
  //       tags: ["nice", "developer"],
  //     },
  //     {
  //       key: "2",
  //       name: "Jim Green",
  //       age: 42,
  //       address: "London No. 1 Lake Park",
  //       tags: ["loser"],
  //     },
  //     {
  //       key: "3",
  //       name: "Joe Black",
  //       age: 32,
  //       address: "Sydney No. 1 Lake Park",
  //       tags: ["cool", "teacher"],
  //     },
  //   ];
  const newUser = users.map((item, index) => {
    return {
      ...item,
      id: index,
    };
  });

  return (
    <>
    {contextHolder}
    <div className="container">
      <h3 className="mb-8 text-3xl">Quản lý người dùng</h3>
      <Table columns={columns} dataSource={newUser} />
    </div>
    </>
  );
};

export default TableUser;
