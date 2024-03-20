import React, { useContext, useEffect } from "react";
import CommonLayout from "../../../components/shop/common-layout";
import { Container, Row, Label, Col } from "reactstrap";
import UserContext from "../../../helpers/user/UserContext";
import {useForm} from "react-hook-form";
import { useRouter } from "next/router";
import LoggedRoute from "../../../routes/LoggedRoute";

const Login = () => {
  const userContext = useContext(UserContext);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = (data) => {
    userContext.login(data);
  };

  return (
    <LoggedRoute>
    {/* <CommonLayout parent="home" title="login"> */}
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
                      // placeholder="Email"
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
                      Contraseña
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
                      // placeholder="Ingrese su contraseña"
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
              <h3>Sumate !</h3>
              <div className="theme-card authentication-right">
                <h6 className="title-font">¿Todavía no te registraste?</h6>
                <p>
                  Para comprar en Ainhoa Vintage tenes que registrarte y luego iniciar sesión !
                </p>
                <button onClick={()=>router.push("/page/account/register")} href="#" className="btn btn-solid">
                  Registrarse
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    {/* </CommonLayout> */}
    </LoggedRoute>
  );
};

export default Login;
