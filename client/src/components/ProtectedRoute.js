import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const validateToken = async () => {
      try {
        const response = axios.post(
          "/api/users/get-user-by-id",
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.status) {
          setLoading(false);
        } else {
          setLoading(false);
          navigate("/log-in");
        }
      } catch (error) {
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
