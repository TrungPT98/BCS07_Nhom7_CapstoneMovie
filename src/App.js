import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserTemplate from "./template/UserTemplate";
import HomePage from "./pages/HomePage/HomePage";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import AdminTemplate from "./template/AdminTemplate";
import UserManagement from "./pages/UserManagement/UserManagement";
import MovieManagment from "./pages/MoviesManagment/MoviesManagment";
import MovieDetail from "./pages/MovieDetail/MovieDetail";
import EditMovie from "./Components/Admin/AdminMovies/EditMovie/EditMovie";
import ShowTimes from "./Components/Admin/AdminMovies/ShowTimes/ShowTimes";
import EditUser from "./Components/Admin/AdminUser/EditUser/EditUser";
import Booking from "./pages/Booking/Booking";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserTemplate />}>
          <Route index element={<HomePage />} />
          <Route path="/detail/:id" element={<MovieDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/booking/:bookingId" element={<Booking />} />
        </Route>
        <Route path="/admin" element={<AdminTemplate />}>
          <Route path="user" element={<UserManagement />} />
          <Route path="edit/:taiKhoan" element={<EditUser />} />
          <Route path="movies" element={<MovieManagment />} />
          <Route path="showtime/:id" element={<ShowTimes />} />
          <Route path="edit/:id" element={<EditMovie />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
