import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserTemplate from "./template/UserTemplate";
import HomePage from "./pages/HomePage/HomePage";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import AdminTemplate from "./template/AdminTemplate";
import UserManagement from "./pages/UserManagement/UserManagement";
import MovieManagment from "./pages/MoviesManagment/MoviesManagment";
import MovieDetail from "./pages/MovieDetail/MovieDetail";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserTemplate />}>
          <Route index element={<HomePage />} />
          <Route path="/detail/:id" element={<MovieDetail/>}/>
          <Route path="/login"  element={<Login/>}/>
          <Route path="/register"  element={<Register/>}/>
        </Route>
        <Route path="/admin" element={<AdminTemplate/>}>
          <Route path="user" element={<UserManagement/>}/>
          <Route path="movies" element={<MovieManagment/>}/>
          <Route path="showtime" />
        </Route>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
