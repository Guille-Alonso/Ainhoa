import React from 'react';
import { Container, Row, Col } from 'reactstrap';

const Paragraph = ({title, inner, line ,hrClass}) => {
    return (
        <>
            <div className={title}>
                <h4>ropa pre-armada</h4>
                <h2 className={inner}>Nuestros Productos</h2>
                {
                    line ?
                        <div className="line"></div> : 
                    hrClass ?
                        <hr role="tournament6"></hr>
                    : ''
                }
            </div>
            <Container>
                <Row>
                    <Col lg="6" className="m-auto">
                        <div className="product-para">
                            <p className="text-center">Segunda Mano - Compra Inteligente</p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Paragraph;