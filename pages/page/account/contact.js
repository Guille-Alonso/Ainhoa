import React, { useContext, useState } from "react";
import { Container, Row, Col, Label } from "reactstrap";
import { useForm } from "react-hook-form";
import UserContext from "../../../helpers/user/UserContext";
import LoaderComponent from "../../../components/common/Loader";

const Data = [
  {
    img: "fa-phone",
    // title: "Teléfono",
    desc1: "+54 9 3813582327",
    // desc2: "+86 163 - 451 - 7894",
  },
  {
    img: "fa-map-marker",
    // title: "Dirección",
    desc1: "Chubut 2.525 Yerba Buena, Tucumán",
    desc2: "Oficina 1er Piso - 'Ainhoa Vintage'",
  },
  {
    img: "fa-envelope-o",
    // title: "Email",
    desc1: "ainhoavintage@gmail.com",
    // desc2: "info@shopcart.com",
  },
  {
    img: "fa-instagram",
    // title: "Ig",
    desc1: "ainhoa_vintage",
  },
];

const ContactDetail = ({ img, title, desc1, desc2 }) => {
  return (
    <li>
      <div className="contact-icon">
        <i className={`fa ${img}`} aria-hidden="true"></i>
        <h6>{title}</h6>
      </div>
      <div className="media-body">
        <p>{desc1}</p>
        <p>{desc2}</p>
      </div>
    </li>
  );
};
const Contact = () => {
  const userContext = useContext(UserContext);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const handleContact = (data) => {
    userContext.contact(data);
  };

  return (
    // <CommonLayout parent="home" title="Contact">
    <section className="contact-page section-b-space">
      { userContext.botonState && <LoaderComponent text="Enviando consulta, por favor aguarde..." />}
      <Container>
        <Row className="section-b-space">
          <Col lg="7" className="map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3560.6056647840282!2d-65.3100825!3d-26.820681999999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9422431f8da4f2f1%3A0x4023b0d8e6ac1408!2sChubut%202525%2C%20T4107%20Yerba%20Buena%2C%20Tucum%C3%A1n!5e0!3m2!1ses-419!2sar!4v1713466079790!5m2!1ses-419!2sar"
              allowFullScreen
            ></iframe>
          </Col>
          <Col lg="5">
            <div className="contact-right">
              <ul>
                {Data.map((data, i) => {
                  return (
                    <ContactDetail
                      key={i}
                      img={data.img}
                      title={data.title}
                      desc1={data.desc1}
                      desc2={data.desc2}
                    />
                  );
                })}
              </ul>
            </div>
          </Col>
        </Row>
        <Row>
          <Col sm="12">
            <form onSubmit={handleSubmit(handleContact)} className="theme-form">
              <Row>
                <Col md="6">
                  <Label className="form-label" for="name">
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
                        value: 2,
                        message:
                          "El nombre no puede tener menos de 2 caracteres",
                      },
                    })}
                    type="text"
                    className="form-control"
                    id="name"
                    required
                    maxLength={35}
                  />
                  {errors.name && (
                    <div className="mb-3">
                      <span className="text-danger">{errors.name.message}</span>
                    </div>
                  )}
                </Col>
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
                        value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
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
                        value: /^\d{0,20}$/,
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
                <Col md="12">
                  <Label className="form-label descapitalize" for="review">
                    Escriba su mensaje
                  </Label>
                  <textarea
                     {...register("message", {
                      required: {
                        value: true,
                        message: "El mensaje es obligatorio",
                      },
                      maxLength: {
                        value: 100,
                        message:
                          "El mensaje no puede tener mas de 100 caracteres",
                      },
                      minLength: {
                        value: 3,
                        message:
                          "El mensaje no puede tener menos de 3 caracteres",
                      },
                      validate: value =>
                      value.trim() !== "" && !/^\s*$/.test(value),
                    })}
                    maxLength={100}
                    required
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    rows="6"
                  ></textarea>
                     {errors.message && (
                          <div className="mb-3">
                            <span className="text-danger">
                              {errors.message.message}
                            </span>
                          </div>
                        )}
                </Col>
                <Col md="12">
                  <button disabled={userContext.botonState} className="btn btn-solid" type="submit">
                    Enviar
                  </button>
                </Col>
              </Row>
            </form>
          </Col>
        </Row>
      </Container>
    </section>
    // </CommonLayout>
  );
};

export default Contact;
