import React from 'react';
import { useRouter } from 'next/router'
import CommonLayout from '../../components/shop/common-layout';
import ProductSection from './common/product_section';
// import { withApollo } from '../../helpers/apollo/apollo';
import LeftSidebarPage from './product/leftSidebarPage';

const LeftSidebar = () => {
  
  const router = useRouter();
  const id = router.query.id;
 
  return (
    <>
      <LeftSidebarPage pathId={id} />
      <ProductSection />
    </>
  );
}


export default LeftSidebar;