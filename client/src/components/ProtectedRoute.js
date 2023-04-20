import axios from "axios";
import { message } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  message.config({ maxCount: 1 });

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
  }, [navigate]);

  return <div>{loading ? <div>Loading</div> : <div>{children}</div>}</div>;
}

export default ProtectedRoute;
