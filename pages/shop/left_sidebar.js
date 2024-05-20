import React, { useContext, useEffect, useState } from 'react';
import CommonLayout from '../../components/shop/common-layout';
// import { withApollo } from '../../helpers/apollo/apollo';
import ProductList from './common/productList';
import { Container, Row} from 'reactstrap';
import FilterPage from './common/filter';
import UserContext from '../../helpers/user/UserContext';
import useGet from '../../utils/useGet';
import axios from '../../config/axios';
import PostLoader from '../../components/common/PostLoader';
import { toast } from 'react-toastify';

const LeftSidebar = () => {

    const [sidebarView,setSidebarView] = useState(false)
    const userContext = useContext(UserContext);
    const [attributes,loadingAttributes] = useGet("/api/bff-store/attributes",axios)
    const [products,loadingProducts] = useGet("/api/bff-store/products",axios)

    const [productsToFilter, setProductsToFilter] = useState([])
    
    useEffect(() => {
     setProductsToFilter(userContext.products)
    }, [userContext.products])                

    const openCloseSidebar = () => {
        if(sidebarView){
            setSidebarView(!sidebarView)
        } else {
            setSidebarView(!sidebarView)
        }
    }
    return (
      <section className="section-b-space ratio_asos">
        <div className="collection-wrapper">
          <Container>
            <Row>
              {!loadingProducts && !loadingAttributes? (
                <>
                  <FilterPage
                    sm="3"
                    sidebarView={sidebarView}
                    closeSidebar={() => openCloseSidebar(sidebarView)}
                    categories={userContext.categories}
                    attributes={attributes}
                    products={products}
                    is_new={userContext.is_new}
                    setIsnew={userContext.setIsnew}
                    setCategory={userContext.setCategory}
                    special_price={userContext.special_price}
                    setSpecialPrice={userContext.setSpecialPrice}
                    attribute={userContext.attribute}
                    setAttribute={userContext.setAttribute}
                  />
                  <ProductList
                    colClass="col-xl-3 col-6 col-grid-box"
                    layoutList=""
                    openSidebar={() => openCloseSidebar(sidebarView)}
                    products={
                      productsToFilter.filter(
                        (item) =>
                          userContext.cart?.products.indexOf(item) === -1
                      ).length == 0
                        ? productsToFilter
                        : productsToFilter.filter(
                            (item) =>
                              userContext.cart?.products.indexOf(item) === -1
                          )
                    }
                  />
                </>
              ) : (
                <div className="row mx-0 margin-default mt-4">
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
            </Row>
          </Container>
        </div>
      </section>
    );
}

export default LeftSidebar;