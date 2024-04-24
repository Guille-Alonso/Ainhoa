import React, { useState, useContext, useEffect } from "react";
import { Col, Row, Media, Button, Spinner } from "reactstrap";
import Menu2 from "../../../public/assets/images/mega-menu/2.jpg";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import FilterContext from "../../../helpers/filter/FilterContext";
import ProductItem from "../../../components/common/product-box/ProductBox1";
import { CurrencyContext } from "../../../helpers/Currency/CurrencyContext";
import { useRouter } from "next/router";
import PostLoader from "../../../components/common/PostLoader";
import CartContext from "../../../helpers/cart";
import { WishlistContext } from "../../../helpers/wishlist/WishlistContext";
import { CompareContext } from "../../../helpers/Compare/CompareContext";
import UserContext from "../../../helpers/user/UserContext";

const GET_PRODUCTS = gql`
  query products(
    $type: _CategoryType!
    $indexFrom: Int!
    $limit: Int!
    $color: String!
    $brand: [String!]!
    $sortBy: _SortBy!
    $priceMax: Int!
    $priceMin: Int!
  ) {
    products(
      type: $type
      indexFrom: $indexFrom
      limit: $limit
      color: $color
      brand: $brand
      sortBy: $sortBy
      priceMax: $priceMax
      priceMin: $priceMin
    ) {
      total
      hasMore
      items {
        id
        title
        description
        type
        brand
        category
        price
        new
        sale
        stock
        discount
        variants {
          id
          sku
          size
          color
          image_id
        }
        images {
          image_id
          id
          alt
          src
        }
      }
    }
  }
`;

const ProductList = ({ colClass, layoutList, openSidebar, noSidebar ,products}) => {
  const cartContext = useContext(CartContext);
  const quantity = cartContext.quantity;
  const wishlistContext = useContext(WishlistContext);
  const compareContext = useContext(CompareContext);
  const router = useRouter();
  const [limit, setLimit] = useState(8);
  const curContext = useContext(CurrencyContext);
  const [grid, setGrid] = useState(colClass);
  const symbol = curContext.state.symbol;
  const filterContext = useContext(FilterContext);
  const selectedBrands = filterContext.selectedBrands;
  const selectedColor = filterContext.selectedColor;
  const selectedPrice = filterContext.selectedPrice;
  const selectedCategory = filterContext.state;
  const selectedCategoryPill = filterContext.selectedCategoryPill;
  const selectedSize = filterContext.selectedSize;
  const selectedSpecialPrice = filterContext.selectedSpecialPrice;
  const selectedIsNew = filterContext.selectedNewAndUsed;
  const [sortBy, setSortBy] = useState("AscOrder");
  const [isLoading, setIsLoading] = useState(false);
  const [layout, setLayout] = useState(layoutList);
  const [url, setUrl] = useState();

  useEffect(() => {
    const pathname = window.location.pathname;
    setUrl(pathname);
    router.push(
      `${pathname}?${filterContext.state}&brand=${selectedBrands}&color=${selectedColor}&size=${selectedSize}&minPrice=${selectedPrice.min}&maxPrice=${selectedPrice.max}`, undefined, { shallow: true }
    );
  }, [selectedBrands, selectedColor, selectedSize, selectedPrice]);

  var { loading, data, fetchMore } = useQuery(GET_PRODUCTS, {
    variables: {
      type: selectedCategory,
      priceMax: selectedPrice.max,
      priceMin: selectedPrice.min,
      color: selectedColor,
      brand: selectedBrands,
      sortBy: sortBy,
      indexFrom: 0,
      limit: limit,
    },
  });

  const handlePagination = () => {
    setIsLoading(true);
    setTimeout(
      () =>
        fetchMore({
          variables: {
            indexFrom: data.products.items.length,
          },
          updateQuery: (prev, { fetchMoreResult }) => {
            if (!fetchMoreResult) return prev;
            setIsLoading(false);
            return {
              products: {
                __typename: prev.products.__typename,
                total: prev.products.total,
                items: [
                  ...prev.products.items,
                  ...fetchMoreResult.products.items,
                ],
                hasMore: fetchMoreResult.products.hasMore,
              },
            };
          },
        }),
      1000
    );
  };

  const removeBrand = (val) => {
    const temp = [...selectedBrands];
    temp.splice(selectedBrands.indexOf(val), 1);
    filterContext.setSelectedBrands(temp);
  };

  const removeSize = (val) => {
    const temp = [...selectedSize];
    temp.splice(selectedSize.indexOf(val), 1);
    filterContext.setSelectedSize(temp);
  };

  const removeSpecialPrice = (val) => {
    const temp = [...selectedSpecialPrice];
    temp.splice(selectedSpecialPrice.indexOf(val), 1);
    filterContext.setSelectedSpecialPrice(temp);
  };

  const removeIsNew = (val) => {
    const temp = [...selectedIsNew];
    temp.splice(selectedIsNew.indexOf(val), 1);
    filterContext.setSelectedNewAndUsed(temp);
  };

  const removeCatPill = (val) => {
    const temp = [...selectedCategoryPill];
    temp.splice(selectedCategoryPill.indexOf(val), 1);
    filterContext.setSelectedCategoryPill(temp);
  };

  const removeColor = () => {
    filterContext.setSelectedColor("");
  };

  const userContext = useContext(UserContext);

  return (
    <Col className="collection-content">
      <div className="page-main-content">
        <Row>
          <Col sm="12">
            <Row>
              <Col xs="12">
                <ul className="product-filter-tags">
                  {selectedBrands.map((brand, i) => (
                    <li key={i}>
                      <a href={null} className="filter_tag">
                        {brand}
                        <i
                          className="fa fa-close"
                          onClick={() => removeBrand(brand)}
                        ></i>
                      </a>
                    </li>
                  ))}
                  {selectedColor ? (
                    <li>
                      <a href={null} className="filter_tag">
                        {selectedColor}
                        <i className="fa fa-close" onClick={removeColor}></i>
                      </a>
                    </li>
                  ) : (
                    ""
                  )}
                  {selectedSize.map((size, i) => (
                    <li key={i}>
                      <a href={null} className="filter_tag">
                        {size}
                        <i
                          className="fa fa-close"
                          onClick={() => removeSize(size)}
                        ></i>
                      </a>
                    </li>
                  ))}

                  {selectedSpecialPrice.map((specialP, i) => (
                    <li key={i}>
                      <a href={null} className="filter_tag">
                        {specialP}
                        <i
                          className="fa fa-close"
                          onClick={() => removeSpecialPrice(specialP)}
                        ></i>
                      </a>
                    </li>
                  ))}

                  {selectedIsNew.map((isNewOrUsed, i) => (
                    <li key={i}>
                      <a href={null} className="filter_tag">
                        {isNewOrUsed}
                        <i
                          className="fa fa-close"
                          onClick={() => removeIsNew(isNewOrUsed)}
                        ></i>
                      </a>
                    </li>
                  ))}

                  {selectedCategoryPill.map((cat, i) => (
                    <li key={i}>
                      <a href={null} className="filter_tag">
                        {cat}
                        <i
                          className="fa fa-close"
                          onClick={() => removeCatPill(cat)}
                        ></i>
                      </a>
                    </li>
                  ))}

                  {/* {
                    <li>
                      <a href={null} className="filter_tag">
                        Precio: {selectedPrice.min}- {selectedPrice.max}
                      </a>
                    </li>
                  } */}
                </ul>
              </Col>
            </Row>
            <div className="collection-product-wrapper">
              <div className="product-top-filter">
                {!noSidebar ? (
                  <Row>
                    <Col xl="12">
                      <div
                        className="filter-main-btn"
                        onClick={() => openSidebar()}
                      >
                        <span className="filter-btn btn btn-theme">
                          <i className="fa fa-filter" aria-hidden="true"></i>{" "}
                          Filtros
                        </span>
                      </div>
                    </Col>
                  </Row>
                ) : (
                  ""
                )}
              </div>
              <div className={`product-wrapper-grid ${layout}`}>
                <Row>
                  {/* Product Box */}
                  {products.length == 0 ? (
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
                  ) : (
                    products &&
                    products.map((product, i) => (
                      <div className={grid} key={i}>
                        <div className="product">
                          <div>
                            <ProductItem
                              des={true}
                              product={product}
                              symbol={symbol}
                              cartClass="cart-info cart-wrap"
                              addCompare={() =>
                                compareContext.addToCompare(product)
                              }
                              addWishlist={() =>
                                wishlistContext.addToWish(product)
                              }
                              addCart={() =>
                                userContext.addProductToCart(product, quantity)
                              }
                            />
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </Row>
              </div>
              {/* <div className="section-t-space">
                <div className="text-center">
                  <Row>
                    <Col xl="12" md="12" sm="12">
                      {data && data.products && data.products.hasMore && (
                        <Button className="load-more" onClick={() => handlePagination()}>
                          {isLoading && (
                            <Spinner animation="border" variant="light" />
                          )}
                          ver mas
                        </Button>
                      )}
                    </Col>
                  </Row>
                </div>
              </div> */}
            </div>
          </Col>
        </Row>
      </div>
    </Col>
  );
};

export default ProductList;