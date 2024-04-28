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

    const [category_id, setCategory] = useState(null);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);
    const [is_new, setIsnew] = useState(null);
    const [special_price, setSpecialPrice] = useState(null);
    const [attribute, setAttribute] = useState(null);
    const [productsToFilter, setProductsToFilter] = useState([])

    const getProductsToFilter = async (url)=>{
      try {
        const {data} = await axios.get(url)

          setProductsToFilter(data);
   
      } catch (error) {
        console.log(error);
      }
    }

    useEffect(() => {
     
        let apiUrl = "/api/bff-store/products";
        let queryParams = [];
  
        const filters = {  size, page, is_new, special_price,attribute };
  
        for (const filter in filters) {
         
          if (filters[filter] !== null && filters[filter] !== undefined && filters[filter] !== -1) {
              queryParams.push(`${filter}=${filters[filter]}`);
          }
      }
  
        if (queryParams.length > 0) {
          apiUrl += '?' + queryParams.join('&');
        }

        if(userContext.flagSearch || userContext.category_id){
          setProductsToFilter(userContext.products);
          userContext.setFlagSearch(false);
        }else{
          getProductsToFilter(apiUrl);
        }
      
     
    }, [ size, page, is_new, special_price, attribute]); //AQUI IBA userContext.products
    
    useEffect(() => {
     setProductsToFilter(userContext.products)
    }, [userContext.products])                  //NUEVO

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
    
                <>
                  <FilterPage
                    sm="3"
                    sidebarView={sidebarView}
                    closeSidebar={() => openCloseSidebar(sidebarView)}
                    categories={userContext.categories}
                    attributes={attributes}
                    products={userContext.products}
                    is_new={is_new}
                    setIsnew={setIsnew}
                    setCategory={userContext.setCategory}
                    special_price={special_price}
                    setSpecialPrice={setSpecialPrice}
                    attribute={attribute}
                    setAttribute ={setAttribute}
                  />
                  <ProductList
                    colClass="col-xl-3 col-6 col-grid-box"
                    layoutList=""
                    openSidebar={() => openCloseSidebar(sidebarView)}
                    products={productsToFilter.filter(item => userContext.cart?.products.indexOf(item) === -1).length==0? productsToFilter :  productsToFilter.filter(item => userContext.cart?.products.indexOf(item) === -1)}
                  />
                </>
           
            </Row>
          </Container>
        </div>
      </section>

    );
}

export default LeftSidebar;