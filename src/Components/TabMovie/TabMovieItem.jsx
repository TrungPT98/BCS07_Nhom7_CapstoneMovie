import { Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { rapServ } from "../../services/rapServices";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import './TabMovie.scss'


const TabMovieItem = ({ maHeThongRap }) => {
  const [lichChieu, setLichChieu] = useState([]);
  const navigate = useNavigate();
  const handleMovieItemClick = (movieId) => {
    navigate(`/booking/${movieId}`);
  };

  useEffect(() => {
    rapServ
      .getAllLichChieuHeThong(maHeThongRap)
      .then((res) => {
        // console.log(res);
        setLichChieu(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [maHeThongRap]);

  const renderTabMovieItem = () => {
    return lichChieu[0]?.lstCumRap.map((item, index) => {
      return {
        label: (
          <div className="text-left md:w-72 xsm:w-32">
            <p className="text-green-600 md:text-base font-semibold xsm:text-xs">{item.tenCumRap}</p>
            <p className="text-ellipsis overflow-hidden ...">{item.diaChi}</p>
          </div>
        ),
        key: index,
        children: (
          <div className="space-y-5" style={{maxHeight: "500px", overflowY: "scroll" }}>
            {item.danhSachPhim.map((item, index) => {
              if (item.dangChieu) {
                return (
                  <div className="flex" key={index}>
                    <div className="md:w-2/12 xsm:w-0">
                      <img src={item.hinhAnh} alt="" className="w-full object-cover rounded-md"/>
                    </div>
                    <div className="md:w-10/12 md:px-5 xsm:w-full xsm:px-0">
                      <h3 className="font-bold md:text-xl md:py-3 xsm:text-base xsm:py-2">
                        <span className="text-white md:text-base xsm:text-xs bg-red-500 px-2 py-1 rounded-md mr-3">
                          C18
                        </span>
                        {item.tenPhim}
                      </h3>
                      <div className="grid md:grid-cols-2 xsm:grid-cols-1 md:gap-5 xsm:gap-1">
                        {item.lstLichChieuTheoPhim
                          .slice(0, 5)
                          .map((suatChieu, index) => {
                            return (
                              <div className="md:w-full xsm:w-36">
                              <a
                              onClick={() => handleMovieItemClick(suatChieu.maLichChieu)}
                                key={index}
                                className="border rounded-md md:py-2 md:px-4 md:text-sm xsm:text-xs xsm:px-2 xsm:py-1 shadow-md lg:text-base hover:bg-red-400 hover:text-white"
                              >
                                {moment(suatChieu.ngayChieuGioChieu).format(
                                  "DD/MM/YYYY, h:mm"
                                )}
                              </a>

                              </div>
                            );
                          })}
                      </div>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        ),
      };
    });
  };

  return (
    <Tabs
      tabPosition="left"
      style={{ maxHeight: "600px"}}
      items={renderTabMovieItem()}
    />
  );
};

export default TabMovieItem;
