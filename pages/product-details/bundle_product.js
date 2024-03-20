import React from "react";
import CommonLayout from "../../components/shop/common-layout";
import ProductSection from "./common/product_section";
// import { withApollo } from "../../helpers/apollo/apollo";
import BundleProductPage from "./product/bundle_page.js";

const BundleProduct = () => {
  return (
    <>
      <BundleProductPage />
      <ProductSection />
    </>
  );
};

export default BundleProduct;
