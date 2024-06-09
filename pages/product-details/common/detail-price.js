import React, { useState, useContext } from "react";
import sizeChart from "../../../public/assets/images/size-chart.jpg";
import { Modal, ModalBody, ModalHeader, Media, Input } from "reactstrap";
import { CurrencyContext } from "../../../helpers/Currency/CurrencyContext";
import CartContext from "../../../helpers/cart";
import UserContext from "../../../helpers/user/UserContext";

const DetailsWithPrice = ({ item, stickyClass, changeColorVar }) => {
  const [modal, setModal] = useState(false);
  const CurContect = useContext(CurrencyContext);
  const symbol = CurContect.state.symbol;
  const toggle = () => setModal(!modal);
  const product = item;
  const context = useContext(CartContext);
  const plusQty = context.plusQty;
  const minusQty = context.minusQty;
  const quantity = context.quantity;
  const uniqueColor = [];
  const uniqueSize = [];

  const userContext = useContext(UserContext);

  return (
    <>
      <div className={`product-right ${stickyClass}`}>
        <h2> {product.name} </h2>
        {product.special_price != 0 && (
          <h4>
            <del>
              {symbol}
              {product.special_price != 0 ? product.price : ""}
            </del>
            <span>% OFF</span>
          </h4>
        )}
        <h3>
          {symbol}
          {product.special_price != 0 && product.special_price ? product.special_price : product.price}
        </h3>
        {changeColorVar === undefined ? (
          <>
            {uniqueColor.some((vari) => vari.color) ? (
              <ul className="color-variant">
                {uniqueColor.map((vari, i) => {
                  return (
                    <li className={vari.color} key={i} title={vari.color}></li>
                  );
                })}
              </ul>
            ) : (
              ""
            )}
          </>
        ) : (
          <>
            {uniqueColor.some((vari) => vari.color) ? (
              <ul className="color-variant">
                {uniqueColor.map((vari, i) => {
                  return (
                    <li
                      className={vari.color}
                      key={i}
                      title={vari.color}
                      onClick={() => changeColorVar(i)}
                    ></li>
                  );
                })}
              </ul>
            ) : (
              ""
            )}
          </>
        )}
        <div className="product-description border-product">
          {product.variants ? (
            <div>
              {uniqueSize.some((size) => size) ? (
                <>
                  <h6 className="product-title size-text">
                    select size
                    <span>
                      <a
                        href={null}
                        data-toggle="modal"
                        data-target="#sizemodal"
                        onClick={toggle}
                      >
                        size chart
                      </a>
                    </span>
                  </h6>
                  <Modal isOpen={modal} toggle={toggle} centered>
                    <ModalHeader toggle={toggle}>
                      Sheer Straight Kurta
                    </ModalHeader>
                    <ModalBody>
                      <Media
                        src={sizeChart.src}
                        alt="size"
                        className="img-fluid"
                      />
                    </ModalBody>
                  </Modal>
                  <div className="size-box">
                    <ul>
                      {uniqueSize.map((data, i) => {
                        return (
                          <li key={i}>
                            <a href={null}>{data}</a>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </>
              ) : (
                ""
              )}
            </div>
          ) : (
            ""
          )}
          <span className="instock-cls">último disponible !</span>
          <h6 className="product-title">Cantidad</h6>
          <div className="qty-box">
            <div className="input-group">
              <span className="input-group-prepend">
                <button
                  disabled
                  type="button"
                  className="btn quantity-left-minus"
                  onClick={minusQty}
                  data-type="minus"
                  data-field=""
                >
                  <i className="fa fa-angle-left"></i>
                </button>
              </span>
              <Input
                disabled
                type="text"
                name="quantity"
                value={quantity}
                className="form-control input-number"
              />
              <span className="input-group-prepend">
                <button
                  disabled
                  type="button"
                  className="btn quantity-right-plus"
                  onClick={() => plusQty(product)}
                  data-type="plus"
                  data-field=""
                >
                  <i className="fa fa-angle-right"></i>
                </button>
              </span>
            </div>
          </div>
        </div>
        <div className="product-buttons">
          <button
            disabled={userContext.botonState}
            href={null}
            className="btn btn-solid"
            onClick={() => userContext.addProductToCart(product, quantity)}
          >
            Agregar
          </button>
          <button
            disabled={userContext.botonState}
            href={null}
            className="btn btn-solid"
            onClick={() =>
              userContext.comprarAgregarProducto(product, quantity)
            }
          >
            Comprar
          </button>
        </div>
        <div className="border-product">
          <h6 className="product-title">Categoría: {product.category}</h6>
          <p>{product.description}</p>
        </div>
        <div className="border-product">
          {
            product.description ? (
              <>
              <h6 className="product-title">Descripción:</h6>
              <p>{product.description}</p>
              </>
            ) : null
          }
        </div>
      </div>
    </>
  );
};

export default DetailsWithPrice;
