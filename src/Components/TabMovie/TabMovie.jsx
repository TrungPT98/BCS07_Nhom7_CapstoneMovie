import { Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { rapServ } from "../../services/rapServices";
import TabMovieItem from "./TabMovieItem";

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
        label: <img src={item.logo} className="md:w-11 md:h-11 xsm:w-8 xsm:h-w-8" alt="" />,
        key: index,
        children: <TabMovieItem maHeThongRap={item.maHeThongRap} />,
      };
    });
  };
  return (
    <div className="bg-gradient-to-r from-cyan-500 to-blue-800 py-10">
    <div className="max-w-screen-xl mx-auto">
      <Tabs tabPosition="left" items={renderItemTab()} className="bg-white"/>
    </div>

    </div>
  );
};

export default TabMovie;
