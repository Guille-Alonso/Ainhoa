import Link from "next/link";
import { Col, Container, Row } from "reactstrap";

const MasterBanner = ({ img, title, desc, link, classes, btn, btnClass }) => {
  return (
    <div>
      <div className={`home ${img} ${classes ? classes : "text-center"}`}>
        <Container>
          <Row>
            <Col>
              <div className="slider-contain">
                <div>
                  <h4 className="descapitalize">Bienvenido a la revolución del consumo</h4>
                  <h1>Compras Inteligentes</h1>
                  <Link
                    href="/shop/products"
                    className={`btn ${btnClass ? btnClass : "btn-solid"}`}>
                    {/* <a > */}
                    {btn ? btn : "Compra aquí"} {/* </a> */}
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default MasterBanner;
