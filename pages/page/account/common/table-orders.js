import { FaEye } from "react-icons/fa";
import React, { useState } from 'react'
import { Button, Col, Container, Media, Row, Spinner, Table } from 'reactstrap'
import { calculateTotal } from "../../../../utils/calculateTotal";
import axios from "../../../../config/axios";
import { toast } from "react-toastify";

const TableOrdersProducts = ({pedidos,setSize,size,loadingPedidos}) => {

  const [products, setProducts] = useState([])

  const getOrder = async (code)=>{
    try {
      const {data} = await axios.get(`/api/bff-store/private/orders/${code}`);
      setProducts(data.products);
      const targetDiv = document.getElementById('target-div');
      if (targetDiv) {
        window.scrollTo({
          top: targetDiv.offsetTop,
          behavior: 'smooth'
        });
      }
      
    } catch (error) {
      toast.error(error.message);
    }
  }
  return (
    <>
      <Table responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Estado</th>
            <th>Modalidad de compra</th>
            <th>Items</th>
            <th>Subtotal</th>
            <th>Total</th>
            <th>Ver</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.map((pedido, index) => (
            <tr key={pedido.code}>
              <td>{index + 1}</td>
              <td>{pedido.status}</td>
              <td>{pedido.shipping_method}</td>
              <td>{pedido.items_count}</td>
              <td>{pedido.subtotal}</td>
              <td>{pedido.total}</td>
              <td>

                <FaEye onClick={() => getOrder(pedido.code)} />
              
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
       
      <Container>
        <div id="target-div" className="section-t-space">
          <div className="text-center">
            <Row>
              <Col xl="12" md="12" sm="12">
                {
                  <Button
                    className="load-more"
                    onClick={() => setSize(size+4)}
                  >
                    {loadingPedidos && <Spinner animation="border" variant="light" />}
                    ver mas
                  </Button>
                }
              </Col>
            </Row>
          </div>
        </div>
        <Row className="d-flex justify-content-center">
          <Col lg="9">
            <div  className="product-order">
              {products.length > 0 && (
                <h3 className="text-center mt-5">Detalle del pedido</h3>
              )}
              {products.length > 0 &&
                products.map((item, i) => (
                  <Row className="product-order-detail" key={i}>
                    <Col xs="3">
                      <Media
                        src={item.image}
                        alt=""
                        className="img-fluid blur-up lazyload"
                      />
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
                        <h5>${item.price}</h5>
                      </div>
                    </Col>
                  </Row>
                ))}
              {products.length > 0 && (
                <div className="mb-2">
                  <div className="total-sec">
                    <ul>
                      <li>
                        subtotal <span>${calculateTotal(products)}</span>
                      </li>
                    </ul>
                  </div>
                  <div className="final-total">
                    <h3>
                      total <span>${calculateTotal(products)}</span>
                    </h3>
                  </div>
                </div>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default TableOrdersProducts