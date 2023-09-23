import { Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { rapServ } from "../../services/rapServices";
import TabMovieItem from "./TabMovieItem";
import './TabMovie.scss'

const TabMovie = () => {
  const [heThongRap, setHeThongRap] = useState([]);

  useEffect(() => {
    rapServ
      .getAllHeThongRap()
      .then((res) => {
        // console.log(res);
        setHeThongRap(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const renderItemTab = () => {
    return heThongRap.map((item, index) => {
      return {
        label: (
          <div className="lg:w-12 lg:h-12 md:w-8 md:h-8 xsm:w-6 xsm:h-6">
            <img
              src={item.logo}
              className="w-full h-full"
              alt=""
            />

          </div>
        ),
        key: index,
        children: <TabMovieItem maHeThongRap={item.maHeThongRap} />,
      };
    });
  };
  return (
    <div className="bg-gradient-to-r from-cyan-500 to-blue-800 py-10" id="cumRap">
    <div className="max-w-screen-xl mx-auto">
      <Tabs tabPosition="left" items={renderItemTab()} className="bg-white"/>
    </div>

    </div>
  );
};

export default TabMovie;
