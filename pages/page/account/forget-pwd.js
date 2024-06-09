import React, { useState } from 'react';
import CommonLayout from '../../../components/shop/common-layout';
import { Container, Row, Form, Input,Col } from 'reactstrap';
import { toast } from 'react-toastify';
import axios from '../../../config/axios';
import { useRouter } from 'next/router';

const ForgetPwd = () => {

    const [email, setEmail] = useState({email:""});
    const [flag, setFlag] = useState(false);
    const router = useRouter();

    const forgetPassword = async (e) =>{
        setFlag(true);
        e.preventDefault();
        try {
            await axios.post("/api/bff-store/auth/password/reset-request", email);
            toast.info("Revise su casilla de correo..")
            router.push("/page/account/login")
            setEmail({email:""})
        } catch (error) {
            toast.error(error.message);
        }
        setFlag(false);
    }
    return (
        // <CommonLayout parent="home" title="Forget Password">
            <section className="pwd-page section-b-space">
                <Container>
                    <Row>
                        <Col lg="6" className="m-auto">
                            <h5>Reestablecer Contraseña</h5>
                            <Form onSubmit={forgetPassword} className="theme-form">
                                <Row>
                                    <Col md="12">
                                        <Input value={email.email} onChange={(e) => setEmail({email:e.target.value})} name='email' type="email" className="form-control" id="email" placeholder="Ingrese su correo"
                                            required maxLength={30}/>
                                    </Col>
                                    <button disabled={flag} type='submit' className="btn btn-solid w-auto">Enviar</button>
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