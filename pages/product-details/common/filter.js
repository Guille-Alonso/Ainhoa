import React, { useContext, useState } from 'react';
import { Col, Collapse, Row } from 'reactstrap';
import FilterPage from '../../shop/common/filter';
import UserContext from '../../../helpers/user/UserContext';
import axios from '../../../config/axios';
import useGet from '../../../utils/useGet';

const Filter = ({noSidebar}) => {
    const backClick = () => {
        document.getElementById("filter").style.left = "-365px";
    }
    
    const [isBrandOpen, setIsBrandOpen] = useState(true);
    const toggleBrand = () => setIsBrandOpen(!isBrandOpen);

    const [sidebarView,setSidebarView] = useState(false)

    const openCloseSidebar = () => {
      if(sidebarView){
          setSidebarView(!sidebarView)
      } else {
          setSidebarView(!sidebarView)
      }
  }
  
    const [categories,loadingCategories] = useGet("/api/bff-store/categories",axios)
    const [attributes,loadingAttributes] = useGet("/api/bff-store/attributes",axios)
    const userContext = useContext(UserContext);

    return (
      <div className="collection-filter-block creative-card creative-inner">
        <div className="collection-mobile-back" onClick={backClick}>
          <span className="filter-back">
            <i className="fa fa-angle-left" aria-hidden="true"></i>
            back
          </span>
        </div>
        <div className="collection-collapse-block border-0 open">
          <h3 className="collapse-block-title mb-0" onClick={toggleBrand}>
            Filtros
          </h3>
          <Collapse isOpen={isBrandOpen}>
            <div className="collection-collapse-block-content">
              <div className="collection-brand-filter">
                {/* <ul className="category-list">
                                <li><a href={null}>clothing</a></li>
                                <li><a href={null}>bags</a></li>
                                <li><a href={null}>footwear</a></li>
                                <li><a href={null}>watches</a></li>
                                <li><a href={null}>accessories</a></li>
                            </ul> */}

                <div className="product-top-filter">
                  {!noSidebar ? (
                    <Row>
                      <Col xl="12">
                        <div
                          className="filter-main-btn"
                          onClick={() => openCloseSidebar()}
                        >
                          <span className="filter-btn btn btn-theme">
                            <i className="fa fa-filter" aria-hidden="true"></i>{" "}
                            Filter
                          </span>
                        </div>
                      </Col>
                    </Row>
                  ) : (
                    ""
                  )}
                </div>
                <FilterPage
                  sidebarView={sidebarView}
                  closeSidebar={() => openCloseSidebar(sidebarView)}
                  categories={categories}
                  attributes={attributes}
                  products={userContext.products}
                />
              </div>
            </div>
          </Collapse>
        </div>
      </div>
    );
}


export default Filter;