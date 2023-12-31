import React, { useState } from "react";
import "./Header.scss";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const [showNavLinks, setShowNavLinks] = useState(false);

  const toggleNavLinks = () => {
    setShowNavLinks(!showNavLinks);
  };

  const { name } = useSelector((state) => state.nguoiDung);
  // console.log(name);

  return (
    <nav className="fixed bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 dark:bg-gray-900 w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <NavLink to="/" className="flex items-center">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8 mr-3"
            alt="Flowbite Logo"
          />
          <span className="self-center md:text-2xl xsm:text-xl font-semibold whitespace-nowrap text-white dark:text-white">
            Cyber Movie
          </span>
        </NavLink>
        <div className="flex md:order-2">
          <div className="md:mt-0 xsm:mt-2">
            {name != null ? (
              <p className="text-white md:mr-2 xsm:mr-1">Hello, {name.hoTen}</p>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className="text-white lg:text-xl md:text-sm xsm:text-xs hover:text-blue-900 md:mr-2 xsm:mr-1"
                >
                  <i className="fa-solid fa-circle-user mr-2 lg:inline md:hidden xsm:hidden"></i>
                  Đăng nhập
                </NavLink>

                <NavLink
                  to="/register"
                  className="text-white lg:text-xl md:text-sm xsm:text-xs hover:text-blue-900"
                >
                  <i className="fa-solid fa-right-to-bracket mr-2 lg:inline md:hidden xsm:hidden"></i>
                  Đăng ký
                </NavLink>
              </>
            )}
          </div>
          <div className="navbar-button ml-2" onClick={toggleNavLinks}>
            <button
              // data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-stone-900 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              // aria-controls="navbar-sticky"
            >
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>

            <div
              className={`navbar-button-content ${
                showNavLinks ? "active" : ""
              }`}
            >
              <ul className="flex flex-col lg:p-4 md:p-0 font-medium border border-gray-100 rounded-b-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                  <a
                    href="#"
                    className="block py-2 lg:pl-3 lg:pr-4 md:pl-1 md:pr-1 text-gray-900 rounded hover:bg-blue-500 hover:text-white dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Lịch chiếu
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 lg:pl-3 lg:pr-4 md:pl-1 md:pr-1 text-gray-900 rounded hover:bg-blue-500 hover:text-white dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Cụm rạp
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 lg:pl-3 lg:pr-4 md:pl-1 md:pr-1 text-gray-900 rounded hover:bg-blue-500 hover:text-white dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Tin tức
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 lg:pl-3 lg:pr-4 md:pl-1 md:pr-1 text-gray-900 rounded hover:bg-blue-500 hover:text-white dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Ứng dụng
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
            <li>
              <a
                href="#lichChieu"
                className="block py-2 pl-3 pr-4 text-white hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Lịch chiếu
              </a>
            </li>
            <li>
              <a
                href="#cumRap"
                className="block py-2 pl-3 pr-4 text-white hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Cụm rạp
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 pl-3 pr-4 text-white hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Tin tức
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 pl-3 pr-4 text-white hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Ứng dụng
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
