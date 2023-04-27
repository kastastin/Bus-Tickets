import React from "react";
import { useSelector } from "react-redux";

function Home() {
  const { user } = useSelector((state) => state.users);

  return (
    <div>
      <p>Home</p>
      {user && (
        <p>
          User: {user.name}
          <br />
          Email: {user.email}
        </p>
      )}
    </div>
  );
}

export default Home;
