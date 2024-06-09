import React from "react";
import { Container, Row, Col, Media } from "reactstrap";
import aboutus from "../../public/assets/img/about/about_banner.jpg";
import ServiceLayout from "../../components/common/Service/service1.js";

const AboutUs = () => {
  return (
    <>
      {/* <CommonLayout parent="home" title="About-us"> */}
      {/* // <!-- about section start --> */}
      <section className="about-page section-b-space">
        <Container>
          <Row>
            <Col lg="12">
              <div className="banner-section">
                <Media
                  src={aboutus.src}
                  className="img-fluid blur-up lazyload"
                  alt=""
                />
              </div>
            </Col>
            {/* <Col sm="6"></Col> */}
            <Col sm="12">
              <h4>¿QUIENES SOMOS Y QUE HACEMOS?</h4>
              <p>
                En Ainhoa Vintage, nos apasiona ofrecerte una forma inteligente de renovar
                tu placard. Nos especializamos en la recirculación de la ropa de
                segunda mano, brindando una alternativa sostenible y accesible
                para todos. Con nuestro lema 'COMPRAS INTELIGENTES', te
                invitamos a unirte a nuestra comunidad, donde cada prenda cuenta
                una historia y cada compra es una contribución al cuidado del
                medio ambiente. Descubrí la emoción de encontrar ropa única y de
                calidad a precios increíbles. ¡Unite a nosotros y hacé de cada
                compra una decisión consciente y amigable con el planeta!” 🌍
                Bienvenidos a la revolución del consumo FUNDAMENTO DEL NOMBRE En
                AINHOA VINTAGE, no solo estamos comprometidos con la excelencia
                y el profesionalismo en nuestro rubro, sino que también buscamos
                promover un mensaje más profundo: el empoderamiento y el amor
                propio. Nuestro nombre, que significa “quien ha nacido
                bendecida” o “mujer de criterio”, refleja nuestra creencia en el
                potencial ilimitado de cada individuo, especialmente de las
                mujeres. Detrás de nuestra empresa, hay un corazón apasionado
                que busca no solo ofrecer prendas únicas y de calidad, sino
                también inspirar a cada persona a abrazar su singularidad y
                confiar en su propio criterio. Creemos en celebrar lo lindo de
                la individualidad y en cultivar la gratitud por todo lo que
                tenemos a nuestro alrededor. En AINHOA VINTAGE, cada pieza
                cuenta una historia y cada cliente es parte de nuestra comunidad
                de personas que valoran la autenticidad y la autoexpresión.
                Unite a nosotros en este viaje de descubrimiento y amor propio.
                ¡Gracias por ser parte de nuestra historia!
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      <div className="section-b-space">
        <ServiceLayout sectionClass={"service border-section small-section"} />
      </div>
      {/* </CommonLayout> */}
    </>
  );
};

export default AboutUs;
