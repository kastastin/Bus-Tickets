import React from "react";

function DefaultLayout({ children }) {
  return (
    <div>
      <p>Default Layout | Info</p>
      {children}
    </div>
  );
}

export default DefaultLayout;
