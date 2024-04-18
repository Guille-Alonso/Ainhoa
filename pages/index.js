import React, { useContext, useEffect, useState } from "react";
import Banner from "./layouts/Fashion/Components/Banner";
import CollectionBanner from "./layouts/Fashion/Components/Collection-Banner";
import SpecialProducts from "../components/common/Collections/TabCollection1";
import ServiceLayout from "../components/common/Service/service1";
import { Product4 } from "../services/script";
import Paragraph from "../components/common/Paragraph";
import Helmet from "react-helmet";
import PostLoader from "../components/common/PostLoader";
import UserContext from "../helpers/user/UserContext";

const Fashion = () => {
  const userContext = useContext(UserContext);

  return (
    <>
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/x-icon" href={"/assets/logo/A.png"} />
      </Helmet>

      <Banner />
      <div className="mt-5">
        <ServiceLayout sectionClass="border-section small-section" />
      </div>
      <CollectionBanner />
      <Paragraph
        title="title1 section-t-space"
        inner="title-inner1"
        hrClass={false}
      />

      {userContext.products.length > 0 ? (
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
          products={userContext.products}
        />
      ) : (
        <div className="row margin-default mx-md-5 mb-md-3">
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
    </>
  );
};

export default Fashion;
