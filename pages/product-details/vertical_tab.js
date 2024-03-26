import React from 'react';
import CommonLayout from '../../components/shop/common-layout';
import ProductSection from './common/product_section';
// import { withApollo } from '../../helpers/apollo/apollo';
import VerticalTabPage from './product/verticalTabPage';

const VerticalTab = () => {
  const id = "1";
  return (
    <>
        <VerticalTabPage pathId="1" />
      <ProductSection />
    </>
  );
}


export default VerticalTab;