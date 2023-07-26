import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nguoiDungServ } from "../../services/nguoiDungService";
import { getAllUserThunk } from "../../redux/slices/nguoiDungSlice";
import TableUser from "../../Components/TableUser/TableUser";
import { Button, Drawer, Radio, Space } from "antd";
import FormAddUser from "../../Components/FormAddUser/FormAddUser";
const UserManagement = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.nguoiDung);
  useEffect(() => {
    dispatch(getAllUserThunk());
  }, []);
  //   console.log(users);
  //   drawer antdesign
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState("right");
  const showDrawer = () => {
    setOpen(true);
  };
  const onChange = (e) => {
    setPlacement(e.target.value);
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <button
        onClick={showDrawer}
        className="bg-green-600 py-2 px-5 rounded-lg mb-5 text-white"
      >
        Thêm mới
      </button>
      <TableUser />
      <Drawer
        title="Thêm người dùng"
        placement={placement}
        width={500}
        onClose={onClose}
        open={open}
        size="large"
      >
        <FormAddUser />
      </Drawer>
    </div>
  );
};

export default UserManagement;
