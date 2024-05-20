import React from "react";
import CommonLayout from "../../components/shop/common-layout";
import { Container, Row, Col, Media } from "reactstrap";
import aboutus from "../../public/assets/images/about/about_us.jpg";
import Slider from "react-slick";
import { Slider2, Slider4 } from "../../services/script";
import ServiceLayout from "../../components/common/Service/service1.js";

const TeamData = [
  {
    img: "/assets/images/team/1.jpg",
    name: "Hileri Keol",
    post: "CEo & Founder At Company",
  },
  {
    img: "/assets/images/team/2.jpg",
    name: "Hileri Keol",
    post: "CEo & Founder At Company",
  },
  {
    img: "/assets/images/team/3.jpg",
    name: "Hileri Keol",
    post: "CEo & Founder At Company",
  },
  {
    img: "/assets/images/team/4.jpg",
    name: "Hileri Keol",
    post: "CEo & Founder At Company",
  },
  {
    img: "/assets/images/team/1.jpg",
    name: "Hileri Keol",
    post: "CEo & Founder At Company",
  },
];

const Team = ({ img, name, post }) => {
  return (
    <div>
      <div>
        <Media src={img} className="img-fluid blur-up lazyload bg-img" alt="" />
      </div>
      <h4>{name}</h4>
      <h6>{post}</h6>
    </div>
  );
};

const TeamDetailData = [
  {
    img: "/assets/images/avtar.jpg",
    name: "mark jenco",
    post: "designer",
    about: "you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings.",
  },
  {
    img: "/assets/images/2.jpg",
    name: "mark jenco",
    post: "designer",
    about: "you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings.",
  },
  {
    img: "/assets/images/avtar.jpg",
    name: "mark jenco",
    post: "designer",
    about: "you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings.",
  },
  {
    img: "/assets/images/avtar.jpg",
    name: "mark jenco",
    post: "designer",
    about: "you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings.",
  },
  {
    img: "/assets/images/avtar.jpg",
    name: "mark jenco",
    post: "designer",
    about: "you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings.",
  },
  {
    img: "/assets/images/avtar.jpg",
    name: "mark jenco",
    post: "designer",
    about: "you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings.",
  },
];

const TeamDetail = ({ img, name, post, about }) => {
  return (
    <div>
      <div className="media">
        <div className="text-center">
          <Media src={img} alt="#" />
          <h5>{name}</h5>
          <h6>{post}</h6>
        </div>
        <div className="media-body">
          <p>{about}</p>
        </div>
      </div>
    </div>
  );
};
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

      {/* <!--Testimonial start--> */}
      <section className="testimonial small-section">
        <Container>
          <Row>
            <Col sm="12">
              <Slider
                {...Slider2}
                className="slide-2 testimonial-slider no-arrow"
              >
                {TeamDetailData.map((data, i) => {
                  return (
                    <TeamDetail
                      key={i}
                      img={data.img}
                      name={data.name}
                      post={data.post}
                      about={data.about}
                    />
                  );
                })}
              </Slider>
            </Col>
          </Row>
        </Container>
      </section>
      {/* <!--Testimonial ends--> */}

      {/* <!--Team start--> */}
      <section id="team" className="team section-b-space ratio_asos">
        <Container>
          <Row>
            <Col sm="12">
              <h2>Nuestro Equipo</h2>
              <Slider className="team-4" {...Slider4}>
                {TeamData.map((data, i) => {
                  return (
                    <Team
                      key={i}
                      img={data.img}
                      name={data.name}
                      post={data.post}
                    />
                  );
                })}
              </Slider>
            </Col>
          </Row>
        </Container>
      </section>
      {/* <!--Team ends--> */}

      <div className="section-b-space">
        <ServiceLayout sectionClass={"service border-section small-section"} />
      </div>
      {/* </CommonLayout> */}
    </>
  );
};

export default AboutUs;
