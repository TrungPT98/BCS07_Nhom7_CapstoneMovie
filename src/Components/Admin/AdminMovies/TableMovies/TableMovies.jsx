import React, { Fragment, useEffect, useState } from "react";
import { Table, Input, Space } from "antd";
import { useDispatch } from "react-redux";
import { renderTableMovies } from "../../../../redux/slices/movieSlice";
import { movieServ } from "../../../../services/movieService";
import { NavLink } from "react-router-dom";
// input search
const { Search } = Input;
const onSearch = (value) => console.log(value);
const TableMovies = () => {
  const [ListMovie, setListMovies] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    movieServ
      .getAllMovie()
      .then((res) => {
        // console.log(res
        setListMovies(res.data.content);
        // console.log(ListMovie);
        dispatch(renderTableMovies(res.data.content));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const columns = [
    {
      title: "Mã phim",
      dataIndex: "maPhim",
      sorter: (a, b) => a.maPhim - b.maPhim,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Hình Ảnh",
      dataIndex: "hinhAnh",
      width: "25%",
      render: (text, record, index) => {
        // console.log(text);
        // console.log(record);
        // console.log(index);
        return (
          <Fragment>
            <img className="" src={text} alt={record.tenPhim} />;
          </Fragment>
        );
      },
    },
    {
      title: "Tên phim",
      dataIndex: "tenPhim",
      width: "15%",
    },
    {
      title: "Mô tả",
      dataIndex: "moTa",
      width: "25%",
      render: (text, record, index) => {
        // console.log(text);
        // console.log(record);
        // console.log(index);
        return (
          <Fragment>
            <p className="line-clamp-2">{text}</p>
          </Fragment>
        );
      },
    },
    {
      title: "Hành động",
      dataIndex: "hanhDong",
      width: "20%",
      render: (text, record, index) => {
        // console.log(text);
        // console.log(record.maPhim);
        // console.log(index);
        return (
          <Fragment>
            <NavLink key={1} className="py-2 px-5 mx-4 bg-red-600 text-white rounded-lg hover:bg-red-400 duration-300  hover:text-white">
              Xoá
            </NavLink>
            <NavLink
            to={`/admin/edit/${record.maPhim}`}
            key={2} 
            className="py-2 px-5 bg-yellow-600 text-white rounded-lg hover:bg-yellow-400 hover:text-white duration-300">
              Sửa
            </NavLink>
          </Fragment>
        );
      },
    },
  ];
  const data = ListMovie;
  // console.log(data)
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  
  return (
    <div className="container">
      <h3 className="mb-6 text-3xl">Quản lý phim</h3>
      
      <Search
        placeholder="input search text"
        allowClear
        onSearch={onSearch}
        style={{
          width: "100%",
          marginBottom: "30px",
        }}
      />
      <Table columns={columns} dataSource={data} onChange={onChange} />
     
    </div>
  );
};

export default TableMovies;
