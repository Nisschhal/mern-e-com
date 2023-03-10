import React from "react";
import { Spinner } from "react-bootstrap";
const Loading = () => {
  return (
    <Spinner
      animation="borders"
      role="status"
      style={{
        width: "100px",
        height: "100px",
        margin: "auto",
        display: "block",
      }}
    >
      <span>Loading...</span>
    </Spinner>
  );
};

export default Loading;
