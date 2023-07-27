import { Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { rapServ } from "../../services/rapServices";
import moment from "moment";

const TabMovieItem = ({ maHeThongRap }) => {
  const [lichChieu, setLichChieu] = useState([]);
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
          <div className="text-left md:w-72 xsm:w-28">
            <p className="text-green-600 text-base font-semibold">{item.tenCumRap}</p>
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
                      <h3 className="font-bold text-xl py-3">
                        <span className="text-white text-base bg-red-500 px-2 py-1 rounded-md mr-3">
                          C18
                        </span>
                        {item.tenPhim}
                      </h3>
                      <div className="grid grid-cols-2 gap-2">
                        {item.lstLichChieuTheoPhim
                          .slice(0, 5)
                          .map((suatChieu, index) => {
                            return (
                              <a
                                key={index}
                                className="border rounded-md md:py-2 md:px-4 md:text-sm xsm:text-xs xsm:px-0 xsm:py-1 shadow-md text-base hover:bg-red-400 hover:text-white"
                              >
                                {moment(suatChieu.ngayChieuGioChieu).format(
                                  "DD/MM/YYYY, h:mm"
                                )}
                              </a>
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
