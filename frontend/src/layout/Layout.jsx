import React from "react";
import Navbar from "../components/navbar/navbar";
import Footer from "../components/footer/footer";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
