import React, { useEffect, useState } from 'react';
import { Container, Row, Form, Input, Label, Col, Button, Spinner } from 'reactstrap';
import TableOrdersProducts from "./table-orders"
import axios from '../../../../config/axios';
import useGet from '../../../../utils/useGet';
import PostLoader from '../../../../components/common/PostLoader';

const ProfilePage = () => {
    const [size, setSize] = useState(5)
    const [page, setPage] = useState(1)
    const [pedidos,loadingPedidos, getPedidos] = useGet(`/api/bff-store/private/orders?page=${page}&size=${size}`,axios);

    useEffect(() => {
      if(size > 5){
        getPedidos();
      }
    }, [size])
    
    return (
      <>
        <section className="contact-page register-page section-b-space">
          <Container>
            <Row>
              <Col sm="12">
                <h3>Pedidos</h3>
                {!loadingPedidos ? (
                    <TableOrdersProducts pedidos={pedidos} setSize={setSize} size={size} loadingPedidos={loadingPedidos}/>
              
                ) : (
                  <PostLoader />
                )}
              </Col>
            </Row>
          </Container>
        </section>
      </>
    );
}

export default ProfilePage;