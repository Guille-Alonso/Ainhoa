import React from "react";
import vendor from "../../../../public/assets/img/sell/sell_banner.jpg";
import { Container, Row, Col, Input, Form } from "reactstrap";
import {
  svgLowCost,
  svgHighGrowth,
  svgPickUp,
  svgApproach,
} from "../../../../services/script";
import ServiceLayout from "../../../../components/common/Service/service1";

const FeatureData = [
  {
    img: svgLowCost,
    title: "lowest cost",
    desc: "Contrary to popular belief, Lorem Ipsum is not simply random text. ",
  },
  {
    img: svgHighGrowth,
    title: "HIGH GROWTH RATE",
    desc: "Contrary to popular belief, Lorem Ipsum is not simply random text. ",
  },
  {
    img: svgPickUp,
    title: "dedicated pickup",
    desc: "Contrary to popular belief, Lorem Ipsum is not simply random text. ",
  },
  {
    img: svgApproach,
    title: "most approachable",
    desc: "Contrary to popular belief, Lorem Ipsum is not simply random text. ",
  },
];

const FeatureComponent = ({ img, title, desc }) => {
  return (
    <Col lg="3" md="6" className="service-block1">
      <div dangerouslySetInnerHTML={{ __html: img }}></div>
      <h4>{title}</h4>
      <p>{desc}</p>
    </Col>
  );
};

const BannerData = [
  {
    no: "1",
    title: "List your products & Get support service provider",
    desc:
      "Register your business for free and create a productcatalogue. Sell under your own private label or sell an existing brand. Get your documentation & cataloging done with ease from our Professional Services network.",
  },
  {
    no: "2",
    title: "Receive Orders & Schedule A Pickup",
    desc:
      "Once listed, your products will be available to millions of users.Get orders and manage your online business via our Seller Panel and Seller Zone Mobile App.",
  },
  {
    no: "3",
    title: "Receive Quick Payment & Grow Your Business",
    desc:
      "Receive quick and hassle-free payments in your account once your orders are fulfilled. Expand your business with low interest & collateral-free loans.",
  },
];

const BannerComponent = ({ no, title, desc }) => {
  return (
    <Col lg="4">
      <div className="step-box">
        <div>
          <div className="steps">{no}</div>
          <h4>{title}</h4>
          <p>{desc}</p>
        </div>
      </div>
    </Col>
  );
};

const Become = () => {
  return (
    <>
      <section className="about-page section-b-space">
        <Container>
          <Row>
            <Col lg="12">
              <div className="banner-section">
                <img
                  src={vendor.src}
                  className="img-fluid blur-up lazyload"
                  alt=""
                />
              </div>
            </Col>
            <Col sm="12">
              <h4>VENDÉ CON AINHOA</h4>

              <p>
                En AINHOA VINTAGE, hacer espacio para prendas nuevas es tan
                fácil como 1, 2, 3. Si tienes ropa en tu placard que ya no usas
                pero que aún está en buen estado, ¡estás en el lugar indicado!
                Aquí te explicamos cómo podés vender tu ropa con nosotros en
                cuatro simples pasos: Ordena el placard: hacete un lugar en la
                agenda para revisar tu armario y seleccionar las prendas que ya
                no usas, que nunca usaste o que simplemente no encajan con tu
                estilo actual. Separá lo que puede venderse: Una vez que hayas
                identificado las prendas aptas para la venta, sepáralas del
                resto de tu placard. Recordá que buscamos ropa en buenas
                condiciones y con estilo. Mándanos foto de lo que separaste:
                sácale foto a cada prenda. Te recomendamos siempre que las fotos
                sean claras, preferentemente con luz de día, envíanoslas al
                3813582327 a través de WhatsApp. ¡No olvides incluir detalles
                como marca en caso de que tenga o alguna otra aclaración
                relevante! Espera con paciencia: Una vez que recibamos tus
                fotos, nuestro equipo las revisará cuidadosamente. Te
                responderemos dentro de las próximas 72 horas diciéndote si tus
                prendas fueron pre-seleccionadas o no. En caso de respuesta
                afirmativa, te mandaremos un PDF con más detalles sobre la
                puesta a punto de tu ropa y la forma de entrega, cómo así
                también información acerca de precios, comisiones, cierre de
                inventario, formas de pago, etc. ¡Y eso es todo! Ordená tu
                placard, gana plata extra y contribuí a un ciclo más sostenible
                de la moda con AINHOA VINTAGE. Estamos emocionados de ver lo que
                tenes para ofrecer.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      <div className="section-b-space">
        <ServiceLayout sectionClass={"service border-section small-section"} />
      </div>
    </>
  );
};

export default Become;
