import { message } from "antd";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import HomeAdmin from "./pages/admin/HomeAdmin";
import BusesAdmin from "./pages/admin/BusesAdmin";
import UsersAdmin from "./pages/admin/UsersAdmin";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PublicRoute from "./components/PublicRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import Loader from "./components/Loader";
import { useSelector } from "react-redux";

import "./App.css";
import "./resources/css/global.css";

function App() {
  message.config({
    top: 15,
    duration: 4,
  });

  const loader = useSelector((state) => state.alerts.loading);

  return (
    <div>
      {loader && <Loader />}
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <HomeAdmin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/buses"
            element={
              <ProtectedRoute>
                <BusesAdmin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute>
                <UsersAdmin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/log-in"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/sign-up"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
