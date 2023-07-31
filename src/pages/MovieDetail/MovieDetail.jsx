import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { Button, Progress, Tabs } from "antd";
import { rapServ } from "../../services/rapServices";

const MovieDetail = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const handleMovieItemClick = (movieId) => {
    navigate(`/booking/${movieId}`);
  };
  const [movieDetail, setMovieDetail] = useState([]);

  useEffect(() => {
    rapServ
      .getLichChieuPhim(id)
      .then((res) => {
        console.log(res.data.content);
        setMovieDetail(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const renderItemTab = () => {
    return movieDetail.heThongRapChieu?.map((htr, index) => {
      return {
        label: (
          <img
            src={htr.logo}
            className="md:w-11 md:h-11 xsm:w-8 xsm:h-w-8"
            alt=""
          />
        ),
        key: index,
        children: (
          <div className="ml-3">
            {htr.cumRapChieu.map((cumRap, index) => {
              return (
                <div key={index} className="mb-4">
                  <h2 className="text-green-900 font-bold text-xl">
                    {cumRap.tenCumRap}
                  </h2>
                  <div className="grid grid-cols-2 gap-2">
                    {cumRap.lichChieuPhim.map((lichChieu, index) => {
                      return (
                        <div key={index}>
                          <div className="md:w-1/2 xsm:w-full">
                            <h3 className="py-1 px-3 bg-orange-700 my-1 w-1/2 text-center text-base text-white rounded-xl mb-3">
                              {lichChieu.tenRap}
                            </h3>
                            <a
                              onClick={() =>
                                handleMovieItemClick(lichChieu.maLichChieu)
                              }
                              className="border rounded-md md:py-2 md:px-4 md:text-sm xsm:text-xs xsm:px-0 xsm:py-1 shadow-md text-base hover:bg-red-400 hover:text-white"
                            >
                              {moment(lichChieu.ngayChieuGioChieu).format(
                                "DD/MM/YYYY ~ h:mm"
                              )}
                            </a>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        ),
      };
    });
  };

  return (
    <div className="bg-gradient-to-r from-cyan-600 to-blue-700">
      <div className="mt-16 max-w-screen-xl mx-auto py-10">
        <div className="w-full md:flex xsm:flex-none">
          <img
            className="md:w-1/3 xsm:w-ful h-auto object-cover rounded-3xl p-3"
            src={movieDetail.hinhAnh}
            alt=""
          />
          <div className="md:pl-10 xsm:px-2 py-4 md:w-2/3 xsm:w-full">
            <h2 className="text-3xl font-bold mb-2 text-sky-100">
              {movieDetail.tenPhim}
            </h2>
            <p className="mb-4 text-sky-100 text-xl py-6">
              Mô tả: {movieDetail.moTa}
            </p>
            <div className="items-center text-sky-100 flex justify-between">
              <div className="text-base mr-2 bg-violet-600 px-4 py-2 rounded-xl">
                Ngày phát hành:{" "}
                {moment(movieDetail.ngayKhoiChieu).format("DD/MM/YYYY, h:mm")}
              </div>
              <div className="text-base">
                <p className="mb-3">
                  Rating:{" "}
                  <span className="bg-violet-500 px-2 rounded-md text-white font-semibold">
                    {movieDetail.danhGia}/10
                  </span>
                </p>
                <Progress
                  type="circle"
                  percent={movieDetail.danhGia * 10}
                  strokeColor={{
                    "0%": "violet",
                    "100%": "purple",
                  }}
                />
              </div>
            </div>
            <Button className="text-lg h-10" type="primary" danger>
              Đặt vé ngay
            </Button>
          </div>
        </div>
        <div className="my-3">
          {movieDetail.heThongRapChieu?.length == 0 ? (
            <p className="text-gray-900 text-center font-bold text-2xl my-5">
              <i class="fa-solid fa-face-sad-cry"></i> Bùn quá, Phim hết chiều
              rùi...
            </p>
          ) : (
            <Tabs
              tabPosition="left"
              items={renderItemTab()}
              className="bg-white py-3 border-transparent shadow-xl"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
