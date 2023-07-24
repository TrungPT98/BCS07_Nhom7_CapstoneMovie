import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserTemplate from "./template/UserTemplate";
import HomePage from "./pages/HomePage/HomePage";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserTemplate />}>
          <Route index element={<HomePage />} />
          <Route path="/login"  element={<Login/>}/>
          <Route path="/register"  element={<Register/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
