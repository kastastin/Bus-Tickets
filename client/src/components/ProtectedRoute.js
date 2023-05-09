import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { message } from "antd";
import { DisplayLoader, HideLoader } from "../redux/alertsSlice";
import { SetUser } from "../redux/usersSlice";
import DefaultLayout from "./DefaultLayout";

function ProtectedRoute({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.users);

  useEffect(() => {
    const validateToken = async () => {
      try {
        dispatch(DisplayLoader());
        const response = await axios.post(
          "/api/users/get-user-by-id",
          {},
          {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          }
        );

        dispatch(HideLoader());
        if (response.data.success) {
          dispatch(SetUser(response.data.data));
        } else {
          localStorage.removeItem("token");
          message.error(response.data.message);
          navigate("/log-in");
        }
      } catch (error) {
        dispatch(HideLoader());
        localStorage.removeItem("token");
        message.error(error.message);
        navigate("/log-in");
      }
    };

    if (localStorage.getItem("token")) {
      validateToken();
    } else {
      navigate("/log-in");
    }
  }, [dispatch, navigate]);
  return <>{user !== null && <DefaultLayout>{children}</DefaultLayout>}</>;
}

export default ProtectedRoute;
