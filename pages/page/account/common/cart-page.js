import React, { useState, useContext } from "react";
import Link from "next/link";
import CartContext from "../../../../helpers/cart";
import { Container, Row, Col, Media, Input } from "reactstrap";
import { CurrencyContext } from "../../../../helpers/Currency/CurrencyContext";
import cart from "../../../../public/assets/images/icon-empty-cart.png";
import UserContext from "../../../../helpers/user/UserContext";
import { calculateTotal } from "../../../../utils/calculateTotal";

const CartPage = () => {
  // const context = useContext(CartContext);
  // const cartItems = context.state;
  // const curContext = useContext(CurrencyContext);
  // const symbol = curContext.state.symbol;
  // const total = context.cartTotal;
  // const removeFromCart = context.removeFromCart;
  const [quantity, setQty] = useState(1);
  const [quantityError, setQuantityError] = useState(false);
  // const updateQty = context.updateQty;

  const userContext = useContext(UserContext);

  const handleQtyUpdate = (item, quantity) => {
    if (quantity >= 1) {
      setQuantityError(false);
      updateQty(item, quantity);
    } else {
      setQuantityError(true);
    }
  };

  const changeQty = (e) => {
    setQuantity(parseInt(e.target.value));
  };

  const minusQty = () => {
    if (quantity > 1) {
      setStock("InStock");
      setQty(quantity - 1);
    }
  };

  const plusQty = (product) => {
    if (product.stock >= quantity) {
      setQty(quantity + 1);
    } else {
      setStock("Out of Stock !");
    }
  };

  return (
    <div>
      {userContext.cart && userContext.cart?.products.length > 0 ? (
        <section className="cart-section section-b-space">
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
                            <Link href={`/left-sidebar/product/` + item.code}>
                              <Media
                                src={
                                  item.images
                                    ? item.images[0].main
                                    : item.images[0].main
                                }
                                alt=""
                              />
                            </Link>
                          </td>
                          <td>
                            <Link href={`/left-sidebar/product/` + item.code}>
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
                              {/* {symbol} */}
                              ${item.price}
                              {/* {item.price - (item.price * item.discount) / 100} */}
                              
                            </h2>
                          </td>
                          <td>
                            <div className="qty-box">
                               {/* <div className="input-group">
                                <input
                                  type="number"
                                  name="quantity"
                                  onChange={(e) =>
                                    handleQtyUpdate(item, e.target.value)
                                  }
                                  className="form-control input-number"
                                  defaultValue={item.qty}
                                  style={{
                                    borderColor: quantityError && "red",
                                  }}
                                />
                              </div>  */}
                              
                            </div>
                            {/* {item.qty >= item.stock ? "out of Stock" : ""} */}
                            1
                          </td>
                          <td>
                            <i
                              className="fa fa-times"
                              onClick={() => userContext.removeProductFromCart(item.code)}></i>
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
                         
                         $ {calculateTotal(userContext.cart?.products)}
                        </h2>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </Col>
            </Row>
            <Row className="cart-buttons">
              <Col xs="6">
                <Link href={`/shop/left_sidebar`} className="btn btn-solid">
                  Continuar comprando
                </Link>
              </Col>
              <Col xs="6">
                <Link href={`/page/account/checkout`} className="btn btn-solid">
                  check out
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
