import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { message } from "antd";
import { DisplayLoader, HideLoader } from "../redux/loadersSlice";
import { SetUser } from "../redux/usersSlice";
import DefaultLayout from "./DefaultLayout";

function ProtectedRoute({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = async () => {
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
      checkToken();
    } else {
      navigate("/log-in");
    }
  }, [dispatch, navigate]);

  return <DefaultLayout>{children}</DefaultLayout>;
}

export default ProtectedRoute;
