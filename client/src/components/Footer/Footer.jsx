import React from "react";
import "./Footer.scss";

const Footer = () => {
  return (
    <div className="footer">
      <div className="bottom">
        <div className="left">
          <span className="logo">NEC</span>
          <span className="copyright">
            © Copyright 2023. All Rights Reserved
          </span>
        </div>
        <div className="right">
          <img src="/img/payment.png" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
