import React, { useContext, useEffect, useState } from "react";
import { Container, Form, Row, Col } from "reactstrap";
import CartContext from "../../../../helpers/cart";

import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { CurrencyContext } from "../../../../helpers/Currency/CurrencyContext";
import UserContext from "../../../../helpers/user/UserContext";
import { calculateTotal } from "../../../../utils/calculateTotal";
import LoaderComponent from "../../../../components/common/Loader";

const CheckoutPage = () => {
  const cartContext = useContext(CartContext);
  const cartItems = cartContext.state;
  const cartTotal = cartContext.cartTotal;
  const curContext = useContext(CurrencyContext);
  const symbol = curContext.state.symbol;
  const [obj, setObj] = useState({});
  const [payment, setPayment] = useState("cod");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(); // initialise the hook
  const router = useRouter();

  const handleCheckout = (data) => {
    userContext.checkout(data);
  };

  const userContext = useContext(UserContext);

  useEffect(() => {
  if(userContext.order && userContext.cart.products.length>0){ //revisar segunda condicion if, deberia ser con ORDER
    userContext.setCart((prevCart) => ({
      ...prevCart,
      products: []
    }));
    router.push("/page/order-success");
  }
  }, [userContext.order])

  return (
    <section className="section-b-space">
      { userContext.botonState && <LoaderComponent text="Procesando compra, por favor aguarde..." />}
      <Container>
        <div className="checkout-page">
          <div className="checkout-form">
            <Form onSubmit={handleSubmit(handleCheckout)}>
              <Row>
                <Col lg="6" sm="12" xs="12">
                  <div className="checkout-title">
                    <h3>Detalles de Facturación</h3>
                  </div>
                  <div className="row check-out">
                    <div className="form-group col-md-6 col-sm-6 col-xs-12">
                      <div className="field-label">Nombre</div>
                      <input
                        type="text"
                        className={`${errors.firstName ? "error_border" : ""}`}
                        name="first_name"
                        {...register("first_name", {
                          required: {
                            value: true,
                            message: "El nombre es obligatorio",
                          },
                          maxLength: {
                            value: 35,
                            message:
                              "El nombre no puede tener mas de 35 caracteres",
                          },
                          minLength: {
                            value: 2,
                            message:
                              "El nombre no puede tener menos de 2 caracteres",
                          },
                        })}
                        maxLength={35}
                        required
                      />
                      {errors.first_name && (
                        <span className="text-danger">
                          {errors.first_name.message}
                        </span>
                      )}
                    </div>
                    <div className="form-group col-md-6 col-sm-6 col-xs-12">
                      <div className="field-label">Apellido</div>
                      <input
                        type="text"
                        className={`${errors.last_name ? "error_border" : ""}`}
                        name="last_name"
                        {...register("last_name", {
                          required: {
                            value: true,
                            message: "El apellido es obligatorio",
                          },
                          maxLength: {
                            value: 35,
                            message:
                              "El apellido no puede tener mas de 35 caracteres",
                          },
                          minLength: {
                            value: 2,
                            message:
                              "El apellido no puede tener menos de 2 caracteres",
                          },
                        })}
                        maxLength={35}
                        required
                      />
                      {errors.last_name && (
                        <span className="text-danger">
                          {errors.last_name.message}
                        </span>
                      )}
                    </div>
                    <div className="form-group col-md-6 col-sm-6 col-xs-12">
                      <div className="field-label">Teléfono</div>
                      <input
                        name="phone"
                        className={`${errors.phone ? "error_border" : ""}`}
                        {...register("phone", {
                          required: {
                            value: true,
                            message: "El teléfono es obligatorio",
                          },
                          pattern: {
                              value:
                              /^\d{0,20}$/,
                              message: "El teléfono ingresado no es válido",
                            },
                          maxLength: {
                            value: 20,
                            message:
                              "El teléfono no puede tener mas de 20 caracteres",
                          },
                          minLength: {
                            value: 7,
                            message:
                              "El teléfono no puede tener menos de 7 caracteres",
                          },
                         
                        })}
                        required
                        type="number"
                      />
                      {errors.phone && (
                         
                            <span className="text-danger">
                              {errors.phone.message}
                            </span>
                        
                        )}
                    </div>
                    <div className="form-group col-md-6 col-sm-6 col-xs-12">
                      <div className="field-label">Email</div>
                      <input
                        //className="form-control"
                        className={`${errors.email ? "error_border" : ""}`}
                        type="text"
                        name="email"
                        {...register("email", {
                          required: {
                            value: true,
                            message: "El correo es obligatorio",
                          },
                          pattern: {
                              value:
                                /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                              message: "El correo ingresado no es válido",
                            },
                          maxLength: {
                            value: 35,
                            message:
                              "El correo no puede tener mas de 35 caracteres",
                          },
                          minLength: {
                            value: 7,
                            message:
                              "El correo no puede tener menos de 7 caracteres",
                          },
                        })}
                        maxLength={35}
                        required
                      />
                       {errors.email && (
                          
                            <span className="text-danger">
                              {errors.email.message}
                            </span>
                         
                        )}
                    </div>
                    <div className="form-group col-md-12 col-sm-12 col-xs-12">
                      <div className="field-label">País</div>
                      <select
                        name="country"
                        {...register("country", { required: true })}
                      >
                        <option>Argentina</option>
                      </select>
                    </div>
                    <div className="form-group col-md-12 col-sm-6 col-xs-12">
                      <div className="field-label">Provincia</div>
                      <input
                        //className="form-control"
                        type="text"
                        maxLength={35}
                        className={`${errors.state ? "error_border" : ""}`}
                        name="state"
                        {...register("state", {
                          required: {
                            value: true,
                            message: "La provincia es obligatoria",
                          },
                          maxLength: {
                            value: 35,
                            message:
                              "La provincia no puede tener mas de 35 caracteres",
                          },
                          minLength: {
                            value: 4,
                            message:
                              "La provincia no puede tener menos de 4 caracteres",
                          },
                        })}
                        // onChange={setStateFromInput}
                      />
                      <span className="error-message">
                        {errors.state && errors.state.message}
                      </span>
                    </div>
                    <div className="form-group col-md-12 col-sm-12 col-xs-12">
                      <div className="field-label">Ciudad</div>
                      <input
                        //className="form-control"
                        className={`${errors.city ? "error_border" : ""}`}
                        type="text"
                        maxLength={35}
                        name="city"
                        {...register("city", {
                          required: {
                            value: true,
                            message: "La ciudad es obligatoria",
                          },
                          maxLength: {
                            value: 35,
                            message:
                              "La ciudad no puede tener mas de 35 caracteres",
                          },
                          minLength: {
                            value: 4,
                            message:
                              "La ciudad no puede tener menos de 4 caracteres",
                          },
                        })}
                        // onChange={setStateFromInput}
                      />
                      <span className="error-message">
                        {errors.city && errors.city.message}
                      </span>
                    </div>
                    <div className="form-group col-md-12 col-sm-12 col-xs-12">
                      <div className="field-label">Dirección</div>
                      <input
                        //className="form-control"
                        className={`${errors.address ? "error_border" : ""}`}
                        type="text"
                        maxLength={35}
                        name="address"
                        {...register("address", {
                          required: {
                            value: true,
                            message: "La dirección es obligatoria",
                          },
                          maxLength: {
                            value: 35,
                            message:
                              "La dirección no puede tener mas de 35 caracteres",
                          },
                          minLength: {
                            value: 7,
                            message:
                              "La dirección no puede tener menos de 7 caracteres",
                          },
                        })}
                      />
                      <span className="error-message">
                        {errors.address && errors.address.message}
                      </span>
                    </div>

                    <div className="form-group col-md-12 col-sm-6 col-xs-12">
                      <div className="field-label">Código postal</div>
                      <input
                        //className="form-control"
                        type="text"
                        maxLength={8}
                        name="pincode"
                        className={`${errors.pincode ? "error_border" : ""}`}
                        {...register("pincode", {
                          required: {
                            value: true,
                            message: "El código postal es obligatorio",
                          },
                          pattern: {
                            value: /\d+/,
                            message:
                              "El código postal no cumple con el formato solicitado",
                          },
                          maxLength: {
                            value: 8,
                            message:
                              "El código postal no puede tener mas de 8 caracteres",
                          },
                          minLength: {
                            value: 3,
                            message:
                              "El código postal no puede tener menos de 3 caracteres",
                          },
                        })}
                      />
                      <span className="error-message">
                        {errors.pincode && errors.pincode.message}
                      </span>
                    </div>
                  </div>
                </Col>
                <Col lg="6" sm="12" xs="12">
                  {userContext.cart?.products.length > 0 ? (
                    <div className="checkout-details">
                      <div className="order-box">
                        <div className="title-box">
                          <div>
                            Producto <span>Total</span>
                          </div>
                        </div>
                        <ul className="qty">
                          {userContext.cart.products.map((item, index) => (
                            <li key={index}>
                              {item.name} × 1 <span>${item.price}</span>
                            </li>
                          ))}
                        </ul>
                        <ul className="sub-total">
                          <li>
                            Subtotal{" "}
                            <span className="count">
                              ${calculateTotal(userContext.cart.products)}
                            </span>
                          </li>
                          <li>
                            Método de entrega
                            <div className="shipping">
                              <div className="shopping-option">
                                <input
                                  value="SHIPPING"
                                  type="radio"
                                  name="shipping_method"
                                  id="free-shipping"
                                  required
                                  {...register("shipping_method", {
                                    required: true,
                                  })}
                                />
                                <label htmlFor="free-shipping">
                                  Envío a domicilio
                                </label>
                              </div>

                              <div className="shopping-option">
                                <input
                                  value="PICKUP"
                                  type="radio"
                                  name="shipping_method"
                                  id="local-pickup"
                                  required
                                  {...register("shipping_method", {
                                    required: true,
                                  })}
                                />
                                <label htmlFor="local-pickup">
                                  Retirar en local
                                </label>
                              </div>
                              {errors.shipping_method && (
                                <small className="text-danger">
                                  * método de entrega
                                </small>
                              )}
                            </div>
                          </li>
                        </ul>
                        <ul className="total">
                          <li>
                            Total{" "}
                            <span className="count">
                              $ {calculateTotal(userContext.cart.products)}
                            </span>
                          </li>
                          <small>*Pago al retirar el producto*</small>
                        </ul>
                      </div>
                      <div className="payment-box">
                        {/* REEMPLAZAR POR EL TOTAL DE MI CARRITO */}
                        {calculateTotal(userContext.cart.products) !== 0 ? (
                          <div className="text-end">
                            <button disabled={userContext.botonState} type="submit" className="btn-solid btn">
                              Finalizar
                            </button>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </Col>
              </Row>
            </Form>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default CheckoutPage;
