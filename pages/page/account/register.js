import React, { useContext, useRef } from 'react';
import CommonLayout from '../../../components/shop/common-layout';
import { Input, Container, Row, Form, Label ,Col} from 'reactstrap';
import UserContext from '../../../helpers/user/UserContext';
import { toast } from 'react-toastify';

const Register = () => {

    const userContext = useContext(UserContext);

    const firstNameRef = useRef(null);
    const lastNameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const repeatPasswordRef = useRef(null);
    const phoneRef = useRef(null);

    const handleRegister = (e) => {
      e.preventDefault();

      const email = emailRef.current.value;
      const password = passwordRef.current.value;
      const name = firstNameRef.current.value;
      const last_name = lastNameRef.current.value;
      const phone = phoneRef.current.value;
      const password_confirmation = repeatPasswordRef.current.value;

      if(password == password_confirmation){

          userContext.register({ email, password, password_confirmation, name, last_name, phone });
      }else{
        toast.error("Las contraseñas no coinciden")
      }

    //   //limpiar campos luego del login
    //   emailRef.current.value = "";
    //   passwordRef.current.value = "";
    };

    return (
      <CommonLayout parent="home" title="register">
        <section className="register-page section-b-space">
          <Container>
            <Row>
              <Col lg="12">
                <h3>create account</h3>
                <div className="theme-card">
                  <Form onSubmit={handleRegister} className="theme-form">
                    <Row>
                      <Col md="6">
                        <Label className="form-label" for="email">
                          Nombres
                        </Label>
                        <Input
                          maxLength={35}
                          required
                          innerRef={firstNameRef}
                          type="text"
                          className="form-control"
                          id="fname"
                        />
                      </Col>
                      <Col md="6">
                        <Label className="form-label" for="review">
                          Apellidos
                        </Label>
                        <Input
                          maxLength={35}
                          required
                          innerRef={lastNameRef}
                          type="text"
                          className="form-control"
                          id="lname"
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col md="6">
                        <Label className="form-label" for="email">
                          Email
                        </Label>
                        <Input
                          maxLength={35}
                          required
                          innerRef={emailRef}
                          type="email"
                          className="form-control"
                          id="email"
                        />
                      </Col>
                      <Col md="6">
                        <Label className="form-label" for="review">
                          Teléfono
                        </Label>
                        <Input
                          maxLength={35}
                          required
                          innerRef={phoneRef}
                          type="text"
                          className="form-control"
                          id="phone"
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col md="6">
                        <Label className="form-label" for="email">
                          Contraseña
                        </Label>
                        <Input
                          maxLength={35}
                          required
                          innerRef={passwordRef}
                          type="password"
                          className="form-control"
                          id="email"
                          placeholder="Ingrese su contraseña"
                        />
                      </Col>
                      <Col md="6">
                        <Label className="form-label" for="review">
                          Repetir Contraseña
                        </Label>
                        <Input
                          maxLength={35}
                          required
                          innerRef={repeatPasswordRef}
                          type="password"
                          className="form-control"
                          id="review"
                          placeholder="Repita su contraseña"
                        />
                      </Col>
                      <Col md="12">
                        <button
                          type="submit"
                          disabled={userContext.botonState}
                          href="#"
                          className="btn btn-solid w-auto"
                        >
                          Registrarte
                        </button>
                      </Col>
                    </Row>
                  </Form>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </CommonLayout>
    );
}

export default Register