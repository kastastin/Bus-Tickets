import React, { useEffect, useState } from "react";
import { message } from "antd";
import { axiosInstance } from "../../helpers/axiosInstance";

const VerifyButton = ({ stripePromise, localBus, setLocalBus }) => {
  message.config({ maxCount: 1 });
  const [stripe, setStripe] = useState(null);

  useEffect(() => {
    const fetchStripeInstance = async () => {
      const stripeInstance = await stripePromise;
      setStripe(stripeInstance);
    };

    fetchStripeInstance();
  }, [stripePromise]);

  const handleClick = async (event) => {
    if (!stripe) return;
    try {
      const response = await axiosInstance.post(
        "/api/seats/create-verification-session"
      );
      const result = await stripe.verifyIdentity(
        response.data.data.clientSecret
      );

      result.error
        ? message.error("User identification failed")
        : message.success("User was identified successfully");

      if (result.error) {
        message.error("User identification failed");
      } else {
        message.success("User was identified successfully");
        setLocalBus((prevData) => ({
          ...prevData,
          isDriverIdentified: true,
        }));
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <button
      className="verify-btn"
      role="link"
      disabled={!stripe}
      onClick={(event) => {
        if (!localBus.isDriverIdentified) handleClick(event);
      }}
    >
      <i
        className="ri-shield-check-fill"
        style={{
          color: `var(--${
            localBus.isDriverIdentified ? "primary" : "secondary"
          })`,
          cursor: `${localBus.isDriverIdentified ? "default" : "pointer"}`,
        }}
      />
    </button>
  );
};

export default VerifyButton;
