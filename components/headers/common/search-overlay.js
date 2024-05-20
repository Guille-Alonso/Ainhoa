import React, { useContext, useEffect, useRef } from "react";
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
import axios from "../../../config/axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import FilterContext from "../../../helpers/filter/FilterContext";

const SearchOverlay = ({setOpenearchOverlay}) => {

const userContext = useContext(UserContext);
const router = useRouter();

const closeSearch = () => {
  document.getElementById("search-overlay").style.display = "none";
};

const contextFilter = useContext(FilterContext);

const searchProduct = async (e) => {
  try {
    e.preventDefault();
    const searchTerm = e.target.elements.searchInput.value;
    const { data } = await axios.get(
      `/api/bff-store/products?search=${searchTerm}`
    );
   
    e.target.elements.searchInput.value = "";
    if(data.length == 0){
      toast.error("producto no encontrado..");
    }else{
      userContext.setFlagSearch(true);
      userContext.setProducts(data);
      const cleanedCatName = data[0].category.replace(/\.{3}/g, ''); // Eliminar puntos suspensivos de 'cat'
      const idCat = userContext.categories.find(c=> c.name.toUpperCase().includes(cleanedCatName.toUpperCase()))?.id;
      userContext.setCategory(idCat)
      contextFilter.handleCategories(data[0].category);
  
      router.push("/shop/left_sidebar");
    }
  } catch (error) {
    console.log(error);
    toast.error(error.response?.data.message || error.message);
  }
  setOpenearchOverlay(false);
  // closeSearch();
};

  return (
    <div id="search-overlay" className="search-overlay">
      <div>
        <span className="closebtn" onClick={()=>setOpenearchOverlay(false)} title="Close Overlay">
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
                      autoComplete="off"
                      autoFocus
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
