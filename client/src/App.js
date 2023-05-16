import { message } from "antd";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import PublicRoute from "./components/PublicRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BusesAdmin from "./pages/admin/BusesAdmin";
import UsersAdmin from "./pages/admin/UsersAdmin";
import Home from "./pages/Home";
import Reservation from "./pages/Reservation";
import Bus from "./pages/Bus";
import Loader from "./components/Loader";


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
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/bus/:id"
            element={
              <ProtectedRoute>
                <Bus />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reservation"
            element={
              <ProtectedRoute>
                <Reservation />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
