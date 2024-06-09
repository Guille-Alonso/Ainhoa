import React, { useEffect, useState, useContext } from "react";
import Link from "next/link";
import { ToastContainer } from "react-toastify";
import {
  Col,
} from "reactstrap";
import config from "./config.json";
import Timer from "../../utils/timer";
import UserContext from "../../helpers/user/UserContext";

const ThemeSettings = () => {
  const [themeLayout, setThemeLayout] = useState(false);



  /*=====================
     Tap on Top
     ==========================*/
  useEffect(() => {
    if (config.config.layout_version && config.config.layout_type) {
      const bodyClass = document.body.classList;
      document.body.className = `${bodyClass} ${config.config.layout_version}  ${config.config.layout_type}`;
    }

    if (localStorage.getItem("color")) {
      document.documentElement.style.setProperty(
        "--theme-deafult",
        localStorage.getItem("color")
      );
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    if (process.browser) {
      if (document.documentElement.scrollTop > 600) {
        document.querySelector(".tap-top").style = "display: block";
      } else {
        document.querySelector(".tap-top").style = "display: none";
      }
    }
  };


  

  if (themeLayout) {
    if (process.browser) {
      document.body.classList.add("dark");
      config.config.layout_version = "dark";
    }
  } else {
    if (process.browser) {
      document.body.classList.remove("dark");
      config.config.layout_version = "light";
    }
  }



  

  const MasterComponent = ({ ribon, bg, name, link, btnName }) => {
    return (
      <Col sm="6" className="text-center demo-effects">
        <div className="set-position">
          <div className={`layout-container ${bg}`}>
            {ribon ? (
              <div className="ribbon-1">
                <span>n</span>
                <span>e</span>
                <span>w</span>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="demo-text">
            <h4>{name}</h4>
            <div
              className="btn-group demo-btn"
              role="group"
              aria-label="Basic example">
              <Link href={link} className="btn new-tab-btn">
                {/* <a > */}
                {btnName}
                {/* </a> */}
              </Link>
            </div>
          </div>
        </div>
      </Col>
    );
  };

  const userContext = useContext(UserContext);

  return (
    <div>
      {userContext.cart?.products.length > 0 && (
        <div className="p-4 addcart_btm_popup" id="fixed_cart_icon">
          <Timer />
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default ThemeSettings;
