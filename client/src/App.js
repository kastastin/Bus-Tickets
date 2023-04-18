import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import "./App.css";
import "./resources/global.css";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/log-in" element={<Login />} />
          <Route path="/sign-up" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
