import React, { useState, useContext } from "react";
import Link from "next/link";
import { Container, Row, Col, Media, Input } from "reactstrap";
import cart from "../../../../public/assets/images/icon-empty-cart.png";
import UserContext from "../../../../helpers/user/UserContext";
import { calculateTotal } from "../../../../utils/calculateTotal";
import defaultThumbImage from '../../../../public/assets/img/product/IMG0_default.jpg';
import LoaderComponent from "../../../../components/common/Loader";

const CartPage = () => {
  const [quantity, setQty] = useState(1);
  const [quantityError, setQuantityError] = useState(false);

  const userContext = useContext(UserContext);

  const handleQtyUpdate = (item, quantity) => {
    if (quantity >= 1) {
      setQuantityError(false);
      updateQty(item, quantity);
    } else {
      setQuantityError(true);
    }
  };

  return (
    <div>
      {userContext.cart && userContext.cart?.products.length > 0 ? (
        <section className="cart-section section-b-space">
          { userContext.botonState && <LoaderComponent text="Quitando producto, por favor aguarde.." /> }
          <Container>
            <Row>
              <Col sm="12">
                <table className="table cart-table table-responsive-xs">
                  <thead>
                    <tr className="table-head">
                      <th scope="col">Imágen</th>
                      <th scope="col">Producto</th>
                      <th scope="col">Precio</th>
                      <th scope="col">Cantidad</th>
                      <th scope="col">Acciones</th>
                      <th scope="col">Total</th>
                    </tr>
                  </thead>
                  {userContext.cart.products.map((item, index) => {
                    return (
                      <tbody key={index}>
                        <tr>
                          <td>
                            <Link href={`/product-details/` + item.code}>
                              <Media
                                src={
                                  item.images.length > 0
                                    ? item.images[0]?.main
                                    : defaultThumbImage.src
                                }
                                alt=""
                              />
                            </Link>
                          </td>
                          <td>
                            <Link href={`/product-details/` + item.code}>
                              {item.name}
                            </Link>
                            <div className="mobile-cart-content row">
                              <div className="col-xs-3">
                                <div className="qty-box">
                                  <div className="input-group">
                                    <input
                                      disabled
                                      type="number"
                                      name="quantity"
                                      onChange={(e) =>
                                        handleQtyUpdate(item, e.target.value)
                                      }
                                      className="form-control input-number"
                                      defaultValue="1"
                                      style={{
                                        borderColor: quantityError && "red",
                                      }}
                                    />
                                  </div>
                                </div>
                                {/* {item.qty >= item.stock ? "out of Stock" : ""} */}
                                
                              </div>
                              <div className="col-xs-3">
                                <h2 className="td-color">
                                  {/* {symbol} */}
                                  $
                                 {item.price}
                                </h2>
                              </div>
                              <div className="col-xs-3">
                                <h2 className="td-color">
                                  <a href="#" className="icon">
                                    <i
                                      className="fa fa-times"
                                      onClick={() => userContext.removeProductFromCart(item.code)}></i>
                                  </a>
                                </h2>
                              </div>
                            </div>
                          </td>
                          <td>
                            <h2>
                              ${item.price}
                            </h2>
                          </td>
                          <td>
                            <div className="qty-box"></div>
                            1
                          </td>
                          <td>
                            {
                              !userContext.botonState &&
                            <i
                              className="fa fa-times imageProductCursorPointer"
                              onClick={() => userContext.removeProductFromCart(item.code)}></i>
                            }
                          </td>
                          <td>
                            <h2 className="td-color">
                              {/* {symbol} */}
                              $
                              {item.price}
                            </h2>
                          </td>
                        </tr>
                      </tbody>
                    );
                  })}
                </table>
                <table className="table cart-table table-responsive-md">
                  <tfoot>
                    <tr>
                      <td>Total:</td>
                      <td>
                        <h2>
                         
                         ${calculateTotal(userContext.cart?.products)}
                        </h2>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </Col>
            </Row>
            <Row className="cart-buttons">
              <Col xs="6">
                <Link href={`/shop/products`} className="btn btn-solid">
                  Seguir comprando
                </Link>
              </Col>
              <Col xs="6">
                <Link href={`/page/account/checkout`} className="btn btn-solid">
                  Finalizar compra
                </Link>
              </Col>
            </Row>
          </Container>
        </section>
      ) : (
        <section className="cart-section section-b-space">
          <Container>
            <Row>
              <Col sm="12">
                <div>
                  <div className="col-sm-12 empty-cart-cls text-center">
                    <Media
                      src={cart}
                      className="img-fluid mb-4 mx-auto"
                      alt=""
                    />
                    <h3>
                      <strong>Su carrito está vacío</strong>
                    </h3>
                    {/* <h4>Vuelva a comprar</h4> */}
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      )}
    </div>
  );
};

export default CartPage;
