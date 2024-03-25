import React from 'react';
import CommonLayout from '../../../components/shop/common-layout';
import { Container, Row, Form, Input,Col } from 'reactstrap';

const ForgetPwd = () => {
    return (
        // <CommonLayout parent="home" title="Forget Password">
            <section className="pwd-page section-b-space">
                <Container>
                    <Row>
                        <Col lg="6" className="m-auto">
                            <h5>Reestablecer Contraseña</h5>
                            <Form className="theme-form">
                                <Row>
                                    <Col md="12">
                                        <Input type="email" className="form-control" id="email" placeholder="Ingrese su correo"
                                            required maxLength={30}/>
                                    </Col>
                                    <button type='submit' href="#" className="btn btn-solid w-auto">Enviar</button>
                                </Row>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </section>
        // </CommonLayout>
    )
}

export default ForgetPwd;