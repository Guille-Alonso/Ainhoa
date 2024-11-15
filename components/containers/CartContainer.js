import React, { useContext, Fragment } from "react";
import Link from "next/link";
import CartHeader from "../headers/common/cart-header";
import CartContext from "../../helpers/cart";
import { Media } from "reactstrap";
import { CurrencyContext } from "../../helpers/Currency/CurrencyContext";
import UserContext from "../../helpers/user/UserContext";
import { calculateTotal } from "../../utils/calculateTotal";

const CartContainer = ({ icon }) => {
  const context = useContext(CartContext);
  const currContext = useContext(CurrencyContext);
  const symbol = currContext.state.symbol;
  const cartList = context.state;
  const total = context.cartTotal;

  const userContext = useContext(UserContext);

  return (
    <Fragment>
      <li className="onhover-div mobile-cart">
        <div className="cart-qty-cls">{userContext.cart? userContext.cart?.products.length : 0}</div>
        <Link href={`/page/account/cart`}>
          <div href={null}>
            <Media src={icon} className="img-fluid" alt="" />
            <i className="fa fa-shopping-cart"></i>
          </div>
        </Link>
        <ul className="show-div shopping-cart">
          {userContext.cart?.products.map((item, index) => (
            <CartHeader key={index} item={item} total={total} symbol={symbol} />
          ))}
          {userContext.cart?.products.length > 0 ? (
            <div>
              <li>
                <div className="total">
                  <h5>
                    subtotal :{" "}
                    <span>
                       ${calculateTotal(userContext.cart?.products)}
                    </span>
                  </h5>
                </div>
              </li>
              <li>
                <div className="buttons view-cart">
                  <Link href={`/page/account/cart`}>
                    {/* <a> */}
                    ver carrito
                    {/* </a> */}
                  </Link>
                  <Link href={`/page/account/checkout`} className="checkout">
                    {/* <a > */}
                    Finalizar
                    {/* </a> */}
                  </Link>
                </div>
              </li>
            </div>
          ) : (
            <li>
              <h5>Su carrito está vacío</h5>
            </li>
          )}
        </ul>
      </li>
    </Fragment>
  );
};

export default CartContainer;
