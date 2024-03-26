import React, { useContext } from "react";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import { Media } from "reactstrap";
import Slider from "react-slick";
import { CurrencyContext } from "../../../helpers/Currency/CurrencyContext";
import UserContext from "../../../helpers/user/UserContext";
import Link from "next/link";

const GET_PRODUCTS = gql`
  query newProducts($type: String!) {
    newProducts(type: $type) {
      title
      price
      images {
        alt
        src
      }
    }
  }
`;

const NewProduct = () => {
  const CurContect = useContext(CurrencyContext);
  const symbol = CurContect.state.symbol;
  var { loading, data } = useQuery(GET_PRODUCTS, {
    variables: {
      type: "fashion",
    },
  });

  const userContext = useContext(UserContext);

  return (
    // <!-- side-bar single product slider start -->
    <div className="theme-card">
      <h5 className="title-border">Nuevos !</h5>
      <Slider className="offer-slider slide-1">
        <div>
          {!userContext.products ||
          userContext.products.length === 0 ? (
            "loading"
          ) : (
            <>
              {userContext.products.length > 0 &&
                userContext.products.slice(3, 5).map((product, index) => (
                  <div className="media" key={index}>
                    <Link href={`/product-details/` + product.code}>
                      <Media
                        className="img-fluid blur-up lazyload"
                        src={product.images[0]?.main}
                        // alt={product.images[0].alt}
                      />
                    </Link>
                    <div className="media-body align-self-center">
                      {/* <div className="rating">
                        <i className="fa fa-star"></i>{" "}
                        <i className="fa fa-star"></i>{" "}
                        <i className="fa fa-star"></i>{" "}
                        <i className="fa fa-star"></i>{" "}
                        <i className="fa fa-star"></i>
                      </div> */}
                      <h4>{product.name}</h4>
                      <a href={null}>
                        <h6>{product.category.length > 10 ? product.category.slice(0, 10)+"...": product.category}</h6>
                      </a>
                      <h4>
                        {symbol}
                        {product.special_price != 0 ?product.special_price : product.price }
                      </h4>
                    </div>
                  </div>
                ))}
            </>
          )}
        </div>
        <div>
          {!userContext.products ||
          userContext.products.length === 0 ? (
            "loading"
          ) : (
            <>
              {userContext.products.length > 0 &&
                userContext.products.slice(0, 2).map((product, index) => (
                  <div className="media" key={index}>
                    <Link href={`/product-details/` + product.code}>
                      <Media
                        className="img-fluid blur-up lazyload"
                        src={product.images[0]?.main}
                        // alt={product.images[0].alt}
                      />
                    </Link>
                    <div className="media-body align-self-center">
                      {/* <div className="rating">
                        <i className="fa fa-star"></i>{" "}
                        <i className="fa fa-star"></i>{" "}
                        <i className="fa fa-star"></i>{" "}
                        <i className="fa fa-star"></i>{" "}
                        <i className="fa fa-star"></i>
                      </div> */}
                       <h4>{product.name}</h4>
                      <a href={null}>
                        <h6>{product.category.length > 10 ? product.category.slice(0, 10)+"...": product.category}</h6>
                      </a>
                      <h4>
                        {symbol}
                        {product.special_price != 0 ?product.special_price : product.price }
                      </h4>
                    </div>
                  </div>
                ))}
            </>
          )}
        </div>
      </Slider>
    </div>
    //  <!-- side-bar single product slider end -->
  );
};

export default NewProduct;
