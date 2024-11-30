import React from "react";

const ErrorPage = () => {
  return (
    <>
      <div>
        <img
          src="/Error404Page.png"
          alt="error-logo"
          style={{ width: "500px", height: "auto" }}
        />
      </div>
      <div>
        <a href="/">Go back To Home</a>
      </div>
    </>
  );
};

export default ErrorPage;
