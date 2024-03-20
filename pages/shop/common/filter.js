import React from 'react';
import { Col, Media } from 'reactstrap';
import sideBanner from '../../../public/assets/images/side-banner.png';
import NewProduct from './newProduct';
import Category from './category';
import Color from './color'
import Size from './size'
import Price from './price';
import { productAttributes } from '../../../utils/productAttributes';
import IsNew from './isNew';
import Attributes from './Attributes';
import SpecialPrice from './specialPrice';

const FilterPage = ({sm,sidebarView,closeSidebar,categories,attributes,products,is_new,setIsnew,setCategory,special_price,setSpecialPrice}) => {
   
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

            <Category categories={categories} setCategory={setCategory}/>

            {attributesArray?.map((a) => (
              <Attributes name={a.name} values={a.values} />
            ))}

            <SpecialPrice special_price={special_price} setSpecialPrice={setSpecialPrice}/>
            <IsNew is_new={is_new} setIsnew={setIsnew}/>
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