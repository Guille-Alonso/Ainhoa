import React, { useContext, useEffect } from 'react';
import { Container, Row, Col, Media } from 'reactstrap';
import { CurrencyContext } from '../../helpers/Currency/CurrencyContext';
import UserContext from '../../helpers/user/UserContext';
import { calculateTotal } from '../../utils/calculateTotal';
import { useRouter } from 'next/router';

const OrderSuccess = () => {
    const curContext = useContext(CurrencyContext);
    const symbol = curContext.state.symbol;

    const userContext = useContext(UserContext);
    const router = useRouter();

    useEffect(()=>{
        if(!userContext.cart){
            router.push("/")
        }
    },[])

    return (
       <>
            <section className="section-b-space light-layout white-1">
                <Container>
                    <Row>
                        <Col md="12">
                            <div className="success-text"><i className="fa fa-check-circle" aria-hidden="true"></i>
                                <h2>Gracias por su compra</h2>
                                <p>En instantes recibirás un mail con la confirmación tu compra</p>
                                {
                                    userContext.order ? (
                                        <p>Orden #{ userContext.order.code }</p>
                                    ) : null
                                }
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            <section className="section-b-space">
                <Container>
                    <Row>
                        <Col lg="12">
                            <div className="product-order">
                                <h3>Detalles del pedido</h3>

                                {userContext.order?.products.map((item, i) =>
                                    <Row className="product-order-detail" key={i}>
                                        <Col xs="3" >
                                            <Media src={item.image} alt=""
                                                className="img-fluid blur-up lazyload" />
                                        </Col>
                                        <Col xs="3" className="order_detail">
                                            <div>
                                                <h4>Producto</h4>
                                                <h5>{item.name}</h5>
                                            </div>
                                        </Col>
                                        <Col xs="3" className="order_detail">
                                            <div>
                                                <h4>Cantidad</h4>
                                                <h5>1</h5>
                                            </div>
                                        </Col>
                                        <Col xs="3" className="order_detail">
                                            <div>
                                                <h4>Precio</h4>
                                                <h5>{symbol}{item.price}</h5>
                                            </div>
                                        </Col>
                                    </Row>
                                )}
                                <div className="total-sec">
                                    <ul>
                                        <li>subtotal <span>{symbol}{calculateTotal(userContext.order?.products)}</span></li>
                                    </ul>
                                </div>
                                <div className="final-total">
                                    <h3>total <span>{symbol}{calculateTotal(userContext.order?.products)}</span></h3>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>

    )
}

export default OrderSuccess;