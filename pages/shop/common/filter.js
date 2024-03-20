import React from 'react';
import { Col, Media } from 'reactstrap';
import sideBanner from '../../../public/assets/images/side-banner.png';
import NewProduct from './newProduct';
import Category from './category';
import Brand from './brand'
import Color from './color'
import Size from './size'
import Price from './price';
import { productAttributes } from '../../../utils/productAttributes';

const FilterPage = ({sm,sidebarView,closeSidebar,categories,attributes,products}) => {
   
    const attributesArray = productAttributes(products)
    return (
      <>
        <Col
          sm={sm}
          className="collection-filter"
          style={sidebarView ? { left: "0px" } : {}}
        >
      
          <div className="collection-filter-block">
       
            <div
              className="collection-mobile-back"
              onClick={() => closeSidebar()}
            >
              <span className="filter-back">
                <i className="fa fa-angle-left" aria-hidden="true"></i> volver
              </span>
            </div>
            <Category categories={categories} />
            {attributesArray?.map((a) => (
              <Brand name={a.name} values={a.values} />
            ))}
            {/* <Color />
            <Size /> */}
            <Price />
          </div>
         
          {/* <NewProduct /> */}
      
          {/* <div className="collection-sidebar-banner">
            <a href={null}>
              <Media
                src={sideBanner.src}
                className="img-fluid blur-up lazyload"
                alt=""
              />
            </a>
          </div> */}
        
        </Col>
      </>
    );
}

export default FilterPage;