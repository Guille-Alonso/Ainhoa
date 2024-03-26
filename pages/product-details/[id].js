import React, { useContext, useState } from 'react';
import { useRouter } from 'next/router'
import CommonLayout from '../../components/shop/common-layout';
import ProductSection from './common/product_section';
// import { withApollo } from '../../helpers/apollo/apollo';
import LeftSidebarPage from './product/leftSidebarPage';
import FilterPage from '../shop/common/filter';
import useGet from '../../utils/useGet';
import axios from '../../config/axios';
import UserContext from '../../helpers/user/UserContext';

const LeftSidebar = () => {
  
  const router = useRouter();
  const id = router.query.id;

//   const [sidebarView,setSidebarView] = useState(false)

//   const openCloseSidebar = () => {
//     if(sidebarView){
//         setSidebarView(!sidebarView)
//     } else {
//         setSidebarView(!sidebarView)
//     }
// }

  // const userContext = useContext(UserContext);
  // const [categories,loadingCategories] = useGet("/api/bff-store/categories",axios)
  // const [attributes,loadingAttributes] = useGet("/api/bff-store/attributes",axios)
  return (
    <>
       {/* <FilterPage
                  sm="3"
                  sidebarView={sidebarView}
                  closeSidebar={() => openCloseSidebar(sidebarView)}
                  categories={categories}
                  attributes={attributes}
                  products={userContext.products}
                /> */}
      <LeftSidebarPage pathId={id} />
      {/* <ProductSection /> */}
    </>
  );
}


export default LeftSidebar;