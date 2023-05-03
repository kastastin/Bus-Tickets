import React from "react";

import "../resources/modal.css";

function Modal({ isModalActive, setIsFormActive, children }) {
  return (
    <div>
      {isModalActive && (
        <div
          className="modal-mask"
          onClick={(e) => {
            if (e.target.classList.contains("modal-mask"))
              setIsFormActive(false);
          }}
        >
          <div className="modal">
            <i
              className="ri-close-circle-line close"
              onClick={() => setIsFormActive(false)}
            ></i>
            {children}
          </div>
        </div>
      )}
    </div>
  );
}

export default Modal;
