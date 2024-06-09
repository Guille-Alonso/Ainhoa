import React, { useState, useEffect, useRef, useContext } from "react";
import Service from "../common/service";
import NewProduct from "../../shop/common/newProduct";
import Slider from "react-slick";
import ImageZoom from "../common/image-zoom";
import DetailsWithPrice from "../common/detail-price";
import { Container, Row, Col, Media } from "reactstrap";
import UserContext from "../../../helpers/user/UserContext";
import PostLoader from "../../../components/common/PostLoader";
import ServiceLayout from "../../../components/common/Service/service1";

const LeftSidebarPage = ({ pathId,noSidebar }) => {
  const userContext = useContext(UserContext);
  const newProductsArray = userContext.products.concat(userContext.cart?.products);
  const data = newProductsArray.find(p=>p?.code == pathId)

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

  return (
    <>
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
                          {data.images && data.images.length > 0 ? (
                            data.images.map((vari, index) => (
                              <div key={index}>
                                <ImageZoom image={vari} />
                              </div>
                            ))
                          ) : (
                            <PostLoader/>
                          )}
                        </Slider>
                      )}
                      
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

    <div className="section-b-space mt-4 pt-4">
      <ServiceLayout sectionClass={"service border-section small-section"} />
    </div>
    </>
  );
};

export default LeftSidebarPage;
