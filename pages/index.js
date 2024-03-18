import React, { useContext, useEffect, useState } from "react";
import Banner from "./layouts/Fashion/Components/Banner";
import CollectionBanner from "./layouts/Fashion/Components/Collection-Banner";
import TopCollection from "../components/common/Collections/Collection3";
import Parallax from "./layouts/Fashion/Components/Parallax";
import SpecialProducts from "../components/common/Collections/TabCollection1";
import ServiceLayout from "../components/common/Service/service1";
import Blog from "../components/common/Blog/blog1";
import Instagram from "../components/common/instagram/instagram1";
import LogoBlock from "../components/common/logo-block";
import HeaderOne from "../components/headers/header-one";
import { Product4 } from "../services/script";
import Paragraph from "../components/common/Paragraph";
import ModalComponent from "../components/common/Modal";
import Helmet from "react-helmet";
import MasterFooter from "../components/footers/common/MasterFooter";
import axios from "../config/axios";
import PostLoader from "../components/common/PostLoader";
import useGet from "../utils/useGet";
import UserContext from "../helpers/user/UserContext";

const Fashion = () => {
  const userContext = useContext(UserContext);
  
  return (
    <>
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="icon"
          type="image/x-icon"
          href={"/assets/images/favicon/1.png"}
        />
      </Helmet>
      {/* <ModalComponent /> */}
      {/* <HeaderOne logoName={"logo.png"} topClass="top-header" /> */}
      {/* <Banner /> */}
      {/* <CollectionBanner /> */}
      <Paragraph
        title="title1 section-t-space"
        inner="title-inner1"
        hrClass={false}
      />

      {userContext.products.length > 0 ? (
        <TopCollection
          noTitle="null"
          backImage={true}
          type="fashion"
          title="top collection"
          subtitle="special offer"
          productSlider={Product4}
          designClass="section-b-space p-t-0 ratio_asos px-2"
          noSlider="false"
          cartClass="cart-info cart-wrap"
          // products={userContext.products}
          products={userContext.products.filter(producto => !userContext.cart?.products.includes(producto))}
        />
      ) : (
        <div className="row margin-default">
        <div className="col-xl-3 col-lg-4 col-6">
          <PostLoader />
        </div>
        <div className="col-xl-3 col-lg-4 col-6">
          <PostLoader />
        </div>
        <div className="col-xl-3 col-lg-4 col-6">
          <PostLoader />
        </div>
        <div className="col-xl-3 col-lg-4 col-6">
          <PostLoader />
        </div>
      </div>
      )}

      <Parallax />
      <SpecialProducts
        type="fashion"
        backImage={true}
        productSlider={Product4}
        line={true}
        title="title1 section-t-space"
        inner="title-inner1"
        designClass="section-b-space p-t-0 ratio_asos"
        noSlider="true"
        cartClass="cart-info cart-wrap"
      />
      {/* <ServiceLayout sectionClass="border-section small-section" /> */}
      {/* <Blog type="fashion" title="title1" inner="title-inner1" /> */}
      {/* <Instagram type="fashion" /> */}
      {/* <div className="section-b-space">
        <LogoBlock />
      </div> */}
      {/* <MasterFooter footerClass={`footer-light`} footerLayOut={"light-layout upper-footer"} footerSection={"small-section border-section border-top-0"} belowSection={"section-b-space light-layout"} newLatter={true} logoName={"logo.png"} /> */}
    </>
  );
};

export default Fashion;
