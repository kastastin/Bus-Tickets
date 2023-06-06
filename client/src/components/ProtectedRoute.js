import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { DisplayLoader, HideLoader } from "../redux/loadersSlice";
import { SetUser } from "../redux/usersSlice";
import axios from "axios";
import DefaultLayout from "./DefaultLayout";

function ProtectedRoute({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const displayError = function (text) {
      message.error(text);
      localStorage.removeItem("token");
      navigate("/log-in");
    };

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

        !response.data.success
          ? displayError(response.data.message)
          : dispatch(SetUser(response.data.data));
      } catch (error) {
        dispatch(HideLoader());
        displayError(error.message);
      }
    };

    localStorage.getItem("token") ? checkToken() : navigate("/log-in");
  }, [dispatch, navigate]);

  return <DefaultLayout>{children}</DefaultLayout>;
}

export default ProtectedRoute;
