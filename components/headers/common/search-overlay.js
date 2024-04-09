import React, { useContext } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Row,
} from "reactstrap";
import UserContext from "../../../helpers/user/UserContext";
import { useRouter } from "next/router";
import axios from "../../../config/axios";

const SearchOverlay = () => {

const userContext = useContext(UserContext);
const router = useRouter();

const closeSearch = () => {
  document.getElementById("search-overlay").style.display = "none";
};

const searchProduct = (e)=>{
  e.preventDefault();
  const searchTerm = e.target.elements.searchInput.value;
  const filterProducts = userContext.products.filter(p=>p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.category.toLowerCase().includes(searchTerm.toLowerCase()));
 
  e.target.elements.searchInput.value = "";
  closeSearch();
}


  return (
    <div id="search-overlay" className="search-overlay">
      <div>
        <span className="closebtn" onClick={closeSearch} title="Close Overlay">
          ×
        </span>
        <div className="overlay-content">
          <Container>
            <Row>
              <Col xl="12">
                <Form onSubmit={searchProduct}>
                  <FormGroup>
                    <Input
                      type="text"
                      className="form-control"
                      id="exampleInputPassword1"
                      placeholder="Busque un producto"
                      required
                      maxLength={50}
                      name="searchInput"
                    />
                  </FormGroup>
                </Form>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default SearchOverlay;
