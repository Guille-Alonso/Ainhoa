import React, { useContext } from 'react';
import CommonLayout from '../../../components/shop/common-layout';
import { Container, Row, Label ,Col} from 'reactstrap';
import UserContext from '../../../helpers/user/UserContext';
import {useForm} from "react-hook-form";
import LoggedRoute from '../../../routes/LoggedRoute';

const Register = () => {

    const userContext = useContext(UserContext);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm();

    const handleRegister = (data) => {
    
    userContext.register(data);

    };

    const password = watch("password", ""); 
    const passwordConfirmation = watch("password_confirmation", ""); 

    return (
        <LoggedRoute>
      <CommonLayout parent="home" title="register">
        <section className="register-page section-b-space">
          <Container>
            <Row>
              <Col lg="12">
                <h3>create account</h3>
                <div className="theme-card">
                  <form
                    onSubmit={handleSubmit(handleRegister)}
                    className="theme-form"
                  >
                    <Row>
                      <Col md="6">
                        <Label className="form-label" for="email">
                          Nombre
                        </Label>
                        <input
                          {...register("name", {
                            required: {
                              value: true,
                              message: "El nombre es obligatorio",
                            },
                            maxLength: {
                              value: 35,
                              message:
                                "El nombre no puede tener mas de 35 caracteres",
                            },
                            minLength: {
                              value: 3,
                              message:
                                "El nombre no puede tener menos de 3 caracteres",
                            },
                          })}
                          maxLength={35}
                          required
                          type="text"
                          className="form-control"
                          id="fname"
                        />
                        {errors.name && (
                          <div className="mb-3">
                            <span className="text-danger">
                              {errors.name.message}
                            </span>
                          </div>
                        )}
                      </Col>
                      <Col md="6">
                        <Label className="form-label" for="review">
                          Apellido
                        </Label>
                        <input
                          {...register("last_name", {
                            required: {
                              value: true,
                              message: "El apellido es obligatorio",
                            },
                            maxLength: {
                              value: 35,
                              message:
                                "El apellido no puede tener mas de 35 caracteres",
                            },
                            minLength: {
                              value: 3,
                              message:
                                "El apellido no puede tener menos de 3 caracteres",
                            },
                          })}
                          maxLength={35}
                          required
                          type="text"
                          className="form-control"
                          id="lname"
                        />
                        {errors.last_name && (
                          <div className="mb-3">
                            <span className="text-danger">
                              {errors.last_name.message}
                            </span>
                          </div>
                        )}
                      </Col>
                    </Row>
                    <Row>
                      <Col md="6">
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
                          maxLength={35}
                          required
                          type="email"
                          className="form-control"
                          id="email"
                        />
                           {errors.email && (
                          <div className="mb-3">
                            <span className="text-danger">
                              {errors.email.message}
                            </span>
                          </div>
                        )}
                      </Col>
                      <Col md="6">
                        <Label className="form-label" for="review">
                          Teléfono
                        </Label>
                        <input
                          {...register("phone", {
                            required: {
                              value: true,
                              message: "El teléfono es obligatorio",
                            },
                            pattern: {
                                value:
                                /^\d{0,20}$/,
                                message: "El teléfono ingresado no es válido",
                              },
                            maxLength: {
                              value: 20,
                              message:
                                "El teléfono no puede tener mas de 20 caracteres",
                            },
                            minLength: {
                              value: 7,
                              message:
                                "El teléfono no puede tener menos de 7 caracteres",
                            },
                           
                          })}
                          required
                          type="number"
                          className="form-control"
                          id="phone"
                        />
                           {errors.phone && (
                          <div className="mb-3">
                            <span className="text-danger">
                              {errors.phone.message}
                            </span>
                          </div>
                        )}
                      </Col>
                    </Row>
                    <Row>
                      <Col md="6">
                        <Label className="form-label" for="email">
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
                      maxlength={35}
                    />
                    {errors.password && (
                      <div className="mb-3">
                        <span className="text-danger">
                          {errors.password.message}
                        </span>
                      </div>
                    )}
                      </Col>
                      <Col md="6">
                        <Label className="form-label" for="review">
                          Repetir Contraseña
                        </Label>
                        <input
                      {...register("password_confirmation", {
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
                        validate: (value) =>
                        value === password || "Las contraseñas no coinciden", // Validación personalizada para verificar que las contraseñas coincidan
                    
                      })}
                      required
                      type="password"
                      className="form-control"
                      id="review"
                      maxlength={35}
                    />
                    {errors.password_confirmation && (
                      <div className="mb-3">
                        <span className="text-danger">
                          {errors.password_confirmation.message}
                        </span>
                      </div>
                    )}
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
                  </form>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </CommonLayout>
      </LoggedRoute>
    );
}

export default Register