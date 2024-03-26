import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Form, Input,Col, Label } from 'reactstrap';
import { useForm } from 'react-hook-form';
import UserContext from '../helpers/user/UserContext';
import { useRouter } from 'next/router';

const RecoveryPassword = () => {
    
    const userContext = useContext(UserContext);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm();

    const password = watch("password", ""); 

    
    const {token} = router.query;

    const handleRecovery = (data)=>{
        const obj = {...data,token}
        userContext.recoveryPassword(obj);
    }

    return (
      <section className="pwd-page section-b-space">
        <Container>
          <Row>
            <Col lg="6" className="m-auto">
           
              <Form onSubmit={handleSubmit(handleRecovery)} className="theme-form">
                <Row>
                  <Col md="12">
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
                      id="password"
                      maxlength={35}
                    />
                    {errors.password && (
                      <div className="mb-3">
                        <span className="text-danger">
                          {errors.password.message}
                        </span>
                      </div>
                    )}

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
                      id="password_confirmation"
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
                  <button disabled={userContext.botonState} type="submit" className="btn btn-solid w-auto">
                    Reestablecer
                  </button>
                </Row>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
    );
}

export default RecoveryPassword;