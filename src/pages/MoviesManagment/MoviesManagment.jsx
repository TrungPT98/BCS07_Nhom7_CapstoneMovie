import React from "react";
import TableMovies from "../../Components/TableMovies/TableMovies";
import { Button } from "antd";
const MovieManagment = () => {
  return (
    <div>
      <Button className="mb-5 ">
        Thêm phim
      </Button>
      <TableMovies />
    </div>
  );
};

export default MovieManagment;
