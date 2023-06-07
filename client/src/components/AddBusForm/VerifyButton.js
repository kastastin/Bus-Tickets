import React, { useEffect, useState } from "react";
import { message } from "antd";
import { axiosInstance } from "../../helpers/axiosInstance";

function VerifyButton({ stripePromise, localBus, setLocalBus }) {
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
      const { error } = await stripe.verifyIdentity(
        response.data.data.clientSecret
      );

      if (error) {
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
      onClick={(e) => {
        if (!localBus.isDriverIdentified) handleClick(e);
      }}
    >
      <i
        className="ri-shield-check-fill"
        style={{
          cursor: `${localBus.isDriverIdentified ? "default" : "pointer"}`,
          color: `var(--${
            localBus.isDriverIdentified ? "primary" : "secondary"
          })`,
        }}
      />
    </button>
  );
}

export default VerifyButton;