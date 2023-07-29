import React, { Fragment, useState } from "react";
import TableMovies from "../../Components/Admin/AdminMovies/TableMovies/TableMovies";
import { Button, Modal } from "antd";
import FormAddMoive from "../../Components/Admin/AdminMovies/TableMovies/FormAddMoive/FormAddMoive";
// import FormAddMovie from "../../Components/Admin/AdminMovies/FormAddMovie/FormAddMovie";
const MovieManagment = () => {
  // onclick modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Button onClick={showModal} className="mb-5 ">
        Thêm phim
      </Button>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
       <FormAddMoive/>
      </Modal>
      <TableMovies/>
    </div>
  );
};

export default MovieManagment;
