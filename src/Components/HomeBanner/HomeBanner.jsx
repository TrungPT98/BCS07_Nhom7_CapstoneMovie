import React, { useEffect, useState } from "react";
import { Carousel } from "antd";
import axios from "axios";
import { https } from "../../services/config";
import { movieServ } from "../../services/movieService";

const HomeBanner = () => {
  const [banner, setBanner] = useState([]);
  const getAllBanner = async () => {
    const res = await movieServ.getAllBanner();
    console.log(res);
    setBanner(res.data.content);
  };
  useEffect(() => {
    getAllBanner();
  }, []);

  return (
    <Carousel>
      {banner.map((banner, index) => {
        return (
          <div key={index} className="md:h-90vh mt-16 xsm:h-72">
            <img
              className="w-full h-full object-cover"
              src={banner.hinhAnh}
              alt=""
            />
          </div>
        );
      })}
    </Carousel>
  );
};

export default HomeBanner;
