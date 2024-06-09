import React from "react";
import {
  svgFreeShipping,
  svgservice,
  svgoffer,
  svgpayment
} from "../../../services/script";
import { Container, Row, Col } from "reactstrap";
import MasterServiceContent from "./MasterServiceConternt";

const Data = [
  {
    link: svgFreeShipping,
    title: "Envíos a Todo el País",
    service: "",
  },
  {
    link: svgpayment,
    title: "Distintos medios de pago",
    service: "",
  },
];

const ServiceLayout = ({ sectionClass }) => {
  return (
    <Container>
      <section className={sectionClass}>
        <Row>
          {Data.map((data, index) => {
            return (
              <Col md="6" className="service-block" key={index}>
                <MasterServiceContent
                  link={data.link}
                  title={data.title}
                  service={data.service}
                />
              </Col>
            );
          })}
        </Row>
      </section>
    </Container>
  );
};

export default ServiceLayout;
