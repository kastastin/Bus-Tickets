import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { message } from "antd";
import { SetUser } from "../redux/usersSlice";

function ProtectedRoute({ children }) {
  message.config({ maxCount: 1 });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const validateToken = async () => {
      try {
        const response = await axios.post(
          "/api/users/get-user-by-id",
          {},
          {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
          setLoading(false);
          dispatch(SetUser(response.data.data));
        } else {
          localStorage.removeItem("token");
          message.error(response.data.message);
          setLoading(false);
          navigate("/log-in");
        }
      } catch (error) {
        localStorage.removeItem("token");
        message.error(error.message);
        setLoading(false);
        navigate("/log-in");
      }
    };

    if (localStorage.getItem("token")) {
      validateToken();
    } else {
      navigate("/log-in");
    }
  }, [dispatch, navigate]);

  return <div>{loading ? <div>Loading</div> : <div>{children}</div>}</div>;
}

export default ProtectedRoute;
