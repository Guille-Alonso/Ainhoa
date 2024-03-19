import React, { useContext, useState } from 'react';
import CommonLayout from '../../components/shop/common-layout';
// import { withApollo } from '../../helpers/apollo/apollo';
import ProductList from './common/productList';
import { Container, Row} from 'reactstrap';
import FilterPage from './common/filter';
import UserContext from '../../helpers/user/UserContext';
import useGet from '../../utils/useGet';
import axios from '../../config/axios';
import PostLoader from '../../components/common/PostLoader';

const LeftSidebar = () => {

    const [sidebarView,setSidebarView] = useState(false)
    const userContext = useContext(UserContext);
    const [categories,loadingCategories] = useGet("/api/bff-store/categories",axios)
    const [attributes,loadingAttributes] = useGet("/api/bff-store/attributes",axios)

    const openCloseSidebar = () => {
        if(sidebarView){
            setSidebarView(!sidebarView)
        } else {
            setSidebarView(!sidebarView)
        }
    }
    return (
      // <CommonLayout title="collection" parent="home" >
      <section className="section-b-space ratio_asos">
        <div className="collection-wrapper">
          <Container>
            <Row>
              {!loadingCategories && !loadingAttributes? (
                <FilterPage
                  sm="3"
                  sidebarView={sidebarView}
                  closeSidebar={() => openCloseSidebar(sidebarView)}
                  categories={categories}
                  attributes={attributes}
                  products={userContext.products}
                />
              ):<PostLoader/>
              }
              <ProductList
                colClass="col-xl-3 col-6 col-grid-box"
                layoutList=""
                openSidebar={() => openCloseSidebar(sidebarView)}
                products={userContext.products}
              />
            </Row>
          </Container>
        </div>
      </section>
      // </CommonLayout>
    );
}

export default LeftSidebar;