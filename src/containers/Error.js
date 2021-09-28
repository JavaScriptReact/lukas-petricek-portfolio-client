import React from "react";
import { useLocation } from "react-router-dom";

const styles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(50%,-50%)",
};

function Error() {
  const location = useLocation();

  return (
    <>
      <h1 style={styles}>404 | Cannot get {location.pathname}</h1>
    </>
  );
}

export default Error;
