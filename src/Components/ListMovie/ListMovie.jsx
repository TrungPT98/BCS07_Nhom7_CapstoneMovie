import React, { useEffect, useState } from "react";
import { movieServ } from "../../services/movieService";
import { Button } from "antd";
import { NavLink } from "react-router-dom";

const ListMovie = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    movieServ
      .getAllMovie()
      .then((res) => {
        // console.log(res);
        setMovies(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return (
    <div className="max-w-screen-xl mx-auto py-10">
      <h2 className="text-3xl font-bold">Danh sách phim</h2>
      <div className="grid md:grid-cols-4 md:gap-5 xsm:grid-cols-2 xsm:gap-2">
        {/* movie item  */}
        {movies.map((item, index) => {
          return (
            <div className="movie_item mt-5" key={index}>
              <img
                src={item.hinhAnh}
                alt=""
                className="md:h-96 w-full object-cover rounded-md xsm:h-64"
              />
              <div className="text my-3">
                <h3 className="font-bold text-lg xl:line-clamp-none lg:line-clamp-1 xsm:line-clamp-1">
                  <span className="text-white text-sm bg-red-500 px-2 py-1 rounded-md mr-1">
                    C18
                  </span>
                  {item.tenPhim}
                </h3>
                <p className="line-clamp-2 my-2">{item.moTa}</p>
                <NavLink
                  className="w-full inline-block"
                  to={`detail/${item.maPhim}`}
                >
                  <Button className="w-full text-lg h-10" type="primary" danger>
                    Xem ngay
                  </Button>
                </NavLink>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ListMovie;
