import React, { Fragment } from "react";
import Header from "../Components/Header/Header";
import { Outlet } from "react-router-dom";
import Footer from "../Components/Footer/Footer";

const UserTemplate = () => {
  return (
    <Fragment>
      <div>
        <Header />
        <Outlet />
        <Footer />
      </div>
    </Fragment>
  );
};

export default UserTemplate;
