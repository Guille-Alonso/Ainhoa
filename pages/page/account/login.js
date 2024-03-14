import React, { useContext } from "react";
import CommonLayout from "../../../components/shop/common-layout";
import { Container, Row, Label, Col } from "reactstrap";
import UserContext from "../../../helpers/user/UserContext";
import {useForm} from "react-hook-form";

const Login = () => {
  const userContext = useContext(UserContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = (data) => {
    userContext.login(data);
  };

  return (
    <CommonLayout parent="home" title="login">
      <section className="login-page section-b-space">
        <Container>
          <Row>
            <Col lg="6">
              <h3>Login</h3>
              <div className="theme-card">
                <form
                  onSubmit={handleSubmit(handleLogin)}
                  className="theme-form"
                >
                  <div className="form-group">
                    <Label className="form-label" for="email">
                      Email
                    </Label>
                    <input
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
                      required
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Email"
                      maxlength={35}
                    />
                    {errors.email && (
                      <div className="mb-3">
                        <span className="text-danger">
                          {errors.email.message}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="form-group">
                    <Label className="form-label" for="review">
                      Password
                    </Label>
                    <input
                      {...register("password", {
                        required: {
                          value: true,
                          message: "La contraseña es obligatoria",
                        },
                        maxLength: {
                          value: 35,
                          message:
                            "La contraseña no puede tener mas de 35 caracteres",
                        },
                        minLength: {
                          value: 5,
                          message:
                            "La contraseña no puede tener menos de 5 caracteres",
                        },
                      })}
                      required
                      type="password"
                      className="form-control"
                      id="review"
                      placeholder="Enter your password"
                      maxlength={35}
                    />
                    {errors.password && (
                      <div className="mb-3">
                        <span className="text-danger">
                          {errors.password.message}
                        </span>
                      </div>
                    )}
                  </div>
                  <button
                    disabled={userContext.botonState}
                    type="submit"
                    href="#"
                    className="btn btn-solid"
                  >
                    Login
                  </button>
                </form>
              </div>
            </Col>
            <Col lg="6" className="right-login">
              <h3>New Customer</h3>
              <div className="theme-card authentication-right">
                <h6 className="title-font">Create A Account</h6>
                <p>
                  Sign up for a free account at our store. Registration is quick
                  and easy. It allows you to be able to order from our shop. To
                  start shopping click register.
                </p>
                <a href="#" className="btn btn-solid">
                  Create an Account
                </a>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </CommonLayout>
  );
};

export default Login;
