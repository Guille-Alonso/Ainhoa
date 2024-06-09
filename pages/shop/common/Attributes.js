import React, { useState, useContext, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import { Collapse, Input } from "reactstrap";
import FilterContext from "../../../helpers/filter/FilterContext";
import UserContext from "../../../helpers/user/UserContext";

const GET_BRAND = gql`
  query getBrands($type: String) {
    getBrands(type: $type) {
      brand
    }
  }
`;

const Attributes = ({ idAttribute, name, values, attribute, setAttribute }) => {
  const context = useContext(FilterContext);
  const userContext = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCheckbox, setSelectedCheckbox] = useState(null);

  const toggleBrand = () => setIsOpen(!isOpen);
    
  // }; 
  const handleCheckboxChange = (index, brand) => {
    // Determinar si el checkbox actual está seleccionado
    const isChecked = context.selectedBrands.includes(brand);
  
    // Desactivar todos los checkboxes
    context.selectedBrands.forEach(checkedBrand => {
      context.handleBrands(checkedBrand, false);
    });
  
    // Si el checkbox actual no estaba seleccionado, lo seleccionamos
    // Si estaba seleccionado, lo deseleccionamos
    const newSelectedBrands = isChecked ? [] : [brand];
    newSelectedBrands.forEach(checkedBrand => {
      context.handleBrands(checkedBrand, true);
    });
  
    // Actualizar el atributo en base a los checkboxes seleccionados
    const cadena = isChecked ? null : `${idAttribute.id},${brand}`;
    setAttribute(cadena);
  };

  var { loading, data } = useQuery(GET_BRAND, {
    variables: {
      type: context.state,
    },
  });

  const showAllAttributes = () =>{
    userContext.setAttribute(null)
    setSelectedCheckbox(null);
  }

  useEffect(() => {
  if(context.selectedBrands.length == 0 && userContext.attribute != null && userContext.flagCatFilter){
    showAllAttributes();
  }
  }, [context.selectedBrands])

  return (
    <div className="collection-collapse-block open">
      <h3 className="collapse-block-title" onClick={toggleBrand}>
        {name}
      </h3>
      <Collapse isOpen={isOpen}>
        <div className="collection-collapse-block-content">
          <div className="collection-brand-filter">
            {!data || !data.getBrands || data.getBrands.length === 0 || loading
              ? "Loading"
              : values &&
              values.map((brand, index) => (
                  <div
                    className="form-check custom-checkbox collection-filter-checkbox"
                    key={index}
                  >
                    <Input
                      // checked={index === selectedCheckbox}
                      checked={context.selectedBrands.includes(brand)}
                      onChange={() => handleCheckboxChange(index, brand)}
                      type="checkbox"
                      className="custom-control-input"
                      id={brand}
                    />
                    <label className="custom-control-label" htmlFor={brand}>
                      {brand}
                    </label>
                  </div>
                ))}
          </div>
        </div>
      </Collapse>
    </div>
  );
};

export default Attributes;

