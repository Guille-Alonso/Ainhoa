import React, { useContext, useEffect, useState } from "react";
import HeaderOne from "../headers/header-one";
import Breadcrubs from "../common/widgets/breadcrubs";
import Helmet from "react-helmet";
import favicon from "../../public/assets/images/favicon/1.png";
import MasterFooter from "../footers/common/MasterFooter";
import UserContext from "../../helpers/user/UserContext";

const CommonLayout = ({ children, title, parent, subTitle }) => {
  const userContext = useContext(UserContext);

  return (
    <>
      {!userContext.loadingCategorias && userContext.categories.length > 0 ? (
        <>
          <HeaderOne topClass="top-header" logoName="logo.png" />
          {/* <Breadcrubs title={title} parent={parent} subTitle={subTitle} /> */}
          {children}
          <MasterFooter
            footerClass={`footer-light `}
            footerLayOut={"light-layout upper-footer"}
            footerSection={"small-section border-section border-top-0"}
            belowSection={"section-b-space light-layout"}
            newLatter={true}
          />
        </>
      ) : (
        <div className="loader-wrapper">
          <div className="loader"></div>
        </div>
      )}
    </>
  );
};

export default CommonLayout;
