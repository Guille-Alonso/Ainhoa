import React, { useState, useEffect, useRef, useContext } from "react";
import ProductTab from "../common/product-tab";
import Service from "../common/service";
import NewProduct from "../../shop/common/newProduct";
import Slider from "react-slick";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import ImageZoom from "../common/image-zoom";
import DetailsWithPrice from "../common/detail-price";
import Filter from "../common/filter";
import { Container, Row, Col, Media } from "reactstrap";
import UserContext from "../../../helpers/user/UserContext";
import PostLoader from "../../../components/common/PostLoader";
import axios from "../../../config/axios";
import useGet from "../../../utils/useGet";
import FilterPage from "../../shop/common/filter";

const GET_SINGLE_PRODUCTS = gql`
  query product($id: Int!) {
    product(id: $id) {
      id
      title
      description
      type
      brand
      category
      price
      new
      sale
      discount
      stock
      variants {
        id
        sku
        size
        color
        image_id
      }
      images {
        alt
        src
      }
    }
  }
`;

const LeftSidebarPage = ({ pathId,noSidebar }) => {
  // var { loading, data } = useQuery(GET_SINGLE_PRODUCTS, {
  //   variables: {
  //     id: parseInt(pathId),
  //   },
  // });
  const userContext = useContext(UserContext);
  const newProductsArray = userContext.products.concat(userContext.cart?.products);
  const data = newProductsArray.find(p=>p?.code == pathId)
  // console.log(userContext.cart.products);
  // console.log(userContext.products);
  // const [state, setState] = useState({ nav1: null, nav2: null });
  // const slider1 = useRef();
  // const slider2 = useRef();

  var products = {
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    arrows: true,
    fade: true,
  };

  const sliderNav = {
    slidesToShow: data?.product?.images?.length,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    adaptiveHeight: true,
    focusOnSelect: true,
  };

  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const [slider1, setSlider1] = useState(null);
  const [slider2, setSlider2] = useState(null);

  useEffect(() => {
    setNav1(slider1);
    setNav2(slider2);
  }, [slider1, slider2]);

  const filterClick = () => {
    document.getElementById("filter").style.left = "-15px";
  };

  const changeColorVar = (img_id) => {
    slider2.current?.slickGoTo(img_id);
  };

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

  return (
    <section className="">
      <div className="collection-wrapper">
        <Container>
          <Row>
            <Col sm="3" className="collection-filter" id="filter">
              <Service />

              <NewProduct />
            </Col>
            <Col lg="9" sm="12" xs="12">
              <Container fluid={true}>
                <Row>
                  <Col xl="12" className="filter-col">
                    <div className="filter-main-btn mb-2">
                      <span
                        onClick={() => openCloseSidebar(sidebarView)}
                        className="filter-btn btn btn-theme"
                      >
                        <i className="fa fa-filter" aria-hidden="true"></i>{" "}
                        Filter
                      </span>
                    </div>
                  </Col>
                </Row>
                {newProductsArray.length == 0 ? (
                  "loading"
                ) : (
                  <Row>
                    <Col lg="6" className="product-thumbnail">
                      {data && (
                        <Slider
                          {...products}
                          asNavFor={nav2}
                          ref={(slider) => setSlider1(slider)}
                          className="product-slick"
                        >
                          {data.images.map((vari, index) => (
                            <div key={index}>
                              <ImageZoom image={vari} />
                            </div>
                          ))}
                        </Slider>
                      )}
                      {/* {data.product.variants.length > 1 && (
                        <Slider className="slider-nav" {...sliderNav} asNavFor={nav1} ref={(slider) => setSlider2(slider)}>
                          {data.product.images.map((item, i) => (
                            <div key={i}>
                              <Media src={item.src} key={i} alt={item.alt} className="img-fluid" />
                            </div>
                          ))}
                        </Slider>
                      )} */}
                    </Col>
                    <Col lg="6" className="rtl-text product-ps">
                      {data ? (
                        <DetailsWithPrice
                          item={data}
                          changeColorVar={changeColorVar}
                        />
                      ) : (
                        <PostLoader />
                      )}
                    </Col>
                  </Row>
                )}
              </Container>
              {/* <ProductTab /> */}
            </Col>
          </Row>
        </Container>
      </div>
    </section>
  );
};

export default LeftSidebarPage;
