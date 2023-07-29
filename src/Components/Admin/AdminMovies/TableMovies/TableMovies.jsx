import React, { Fragment, useEffect, useState } from "react";
import { Table, Input, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { renderTableMovies } from "../../../../redux/slices/movieSlice";
import { movieServ } from "../../../../services/movieService";
import { NavLink } from "react-router-dom";
import {
  deleteMovieAction,
  getAllMovieAction,
} from "../../../../redux/actions/QuanLyMovies";

const TableMovies = () => {
  const dispatch = useDispatch();
  // input search
  const { Search } = Input;
  const onSearch = (value) => {
    console.log(value);
    // gọi ai getAllMovie
    dispatch(getAllMovieAction(value));
    
  };
  
  const [ListMovie, setListMovies] = useState([]);
  const { movies } = useSelector((state) => state.movies);
  console.log(movies);
  console.log(ListMovie)
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
  const getNewListMovie = () => {
    movieServ
      .getAllMovie()
      .then((res) => {
        setListMovies(res.data.content);
        dispatch(renderTableMovies(res.data.content));
      })
      .catch((err) => {
        console.log(err);
      });
  };
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
      dataIndex: "maPhim",
      width: "20%",
      render: (text, record, index) => {
        // console.log(text);
        // console.log(record.maPhim);
        // console.log(index);
        return (
          <Fragment>
            <button
              key={1}
              onClick={async () => {
                // muốn xoá k??
                if (
                  window.confirm(
                    `Bạn có chắc muốn xoá phim ${record.tenPhim} không`
                  )
                ) {
                  //  gọi action xoá
                  await dispatch(deleteMovieAction(record.maPhim));
                  getNewListMovie();
                }
              }}
              className="py-2 px-5 mx-4 bg-red-600 text-white rounded-lg hover:bg-red-400 duration-300  hover:text-white"
            >
              Xoá
            </button>
            <NavLink
              to={`/admin/edit/${record.maPhim}`}
              key={2}
              className="py-2 px-5 bg-yellow-600 text-white rounded-lg hover:bg-yellow-400 hover:text-white duration-300"
            >
              Sửa
            </NavLink>
          </Fragment>
        );
      },
    },
  ];
  const data = movies;
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
      <Table
        columns={columns}
        dataSource={data}
        onChange={onChange}
        rowKey={"maPhim"}
      />
    </div>
  );
};

export default TableMovies;
