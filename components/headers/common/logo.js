import React, { Fragment } from "react";
import Link from "next/link";

const LogoImage = ({ logo }) => {
  return (
    <Fragment>
      <Link href={"/"}>
        {/* <a> */}
        <img
          // src={`/assets/images/icon/${logo ? logo : "logo.png"}`}
          src="/assets/logo/Ainhoa.png"
          alt=""
          className="img-fluid logoAinhoa"
        />
        {/* </a> */}
      </Link>
    </Fragment>
  );
};

export default LogoImage;
