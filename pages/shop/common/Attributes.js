import React, { useState, useContext } from "react";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import { Collapse, Input } from "reactstrap";
import FilterContext from "../../../helpers/filter/FilterContext";

const GET_BRAND = gql`
  query getBrands($type: String) {
    getBrands(type: $type) {
      brand
    }
  }
`;

const Attributes = ({idAttribute,name,values,attribute, setAttribute}) => {
  console.log(idAttribute);

  const [checked, setChecked] = useState(false)

  const context = useContext(FilterContext);
  const isChecked = context.isChecked;
  const filterChecked = context.filterChecked;
  const [isOpen, setIsOpen] = useState(false);
  const toggleBrand = () => setIsOpen(!isOpen);

  var { loading, data } = useQuery(GET_BRAND, {
    variables: {
      type: context.state,
    },
  });

  const onChangeCheck = (brand, isChecked)=>{
    console.log(isChecked);
      let cadena = `${idAttribute.id},${brand}`
      setAttribute(cadena)
      context.handleBrands(brand, isChecked);
  
  }

  const [selectedCheckbox, setSelectedCheckbox] = useState(null);

  const handleCheckboxChange = (id,brand) => {
    console.log(selectedCheckbox);
    console.log(id);
    if(selectedCheckbox == null){

      setSelectedCheckbox(id === selectedCheckbox ? null : id);
      let cadena = `${idAttribute.id},${brand}`
        setAttribute(cadena)
        context.handleBrands(brand, isChecked);
    }else{
      setAttribute(null);
      setSelectedCheckbox(id === selectedCheckbox ? null : id);
      context.handleBrands(brand, isChecked);
    }
  };

  return (
    <div className="collection-collapse-block open">
      <h3 className="collapse-block-title" onClick={toggleBrand}>
        {name}
      </h3>
      <Collapse isOpen={isOpen}>
        <div className="collection-collapse-block-content">
          <div className="collection-brand-filter">
            {!data || !data.getBrands || data.getBrands.length === 0 || loading
              ? "loading"
              : values &&
              values.map((brand, index) => (
                  <div
                    className="form-check custom-checkbox collection-filter-checkbox"
                    key={index}
                  >
                    <Input
                      checked={index === selectedCheckbox}
                      onChange={() => handleCheckboxChange(index,brand)}
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
