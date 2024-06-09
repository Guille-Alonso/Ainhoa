import React, { useState } from "react";
import {
  Col,
  Row,
  Modal,
  ModalBody,
} from "reactstrap";

const LoaderComponent = ({text}) => {
  const [modal, setModal] = useState(true);

  const toggle = () => setModal(!modal);

  return (
    <Modal
      isOpen={modal}
      toggle={toggle}
      className="theme-modal modal-lg"
      centered
    >
      <div>
        <ModalBody className="modal1">
          <Row className="compare-modal">
            <Col lg="12">
              <div className="modal-bg">
                <div className="offer-content text-center">
                  <h3>{ text || 'Procesando información, por favor aguarde...'}</h3>
                  <div className="typography_section">
                    <div className="typography-box">
                    <div className="typo-content loader-typo">
                    <div className="pre-loader"></div>
                    </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </ModalBody>
      </div>
    </Modal>
  );
};

export default LoaderComponent;
