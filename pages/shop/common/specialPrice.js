import React, { useState ,useContext } from 'react';
import { Collapse, Input } from 'reactstrap';
import FilterContext from '../../../helpers/filter/FilterContext';

const SpecialPrice = ({special_price, setSpecialPrice}) => {
    const [isOpen, setIsOpen] = useState(false);
    const context = useContext(FilterContext);
    const [selectedCheckbox, setSelectedCheckbox] = useState(null);
    const toggle = () => setIsOpen(!isOpen);

      const specialPricesOptions = ["Si","No"];

      const handleCheckboxChange = (index, brand) => {
        // Deseleccionar el checkbox actual si ya estaba seleccionado, de lo contrario, seleccionarlo
        setSelectedCheckbox(prevIndex => prevIndex === index ? null : index);
      
        // Crear el atributo con el formato adecuado o null si se está deseleccionando
        const cadena = selectedCheckbox === index ? null : `${brand == "Si"? 1 : 0}`;
        setSpecialPrice(cadena);
      
        // Manejar la selección/deselección del checkbox actual en el contexto
        context.handleSpecialPrice(brand, selectedCheckbox !== index);
      
        // Deseleccionar los checkboxes de los otros atributos
        specialPricesOptions.forEach((otherBrand, i) => {
          if (i !== index && i !== selectedCheckbox && selectedCheckbox !== null) {
            const otherCadena = `${otherBrand}`;
            context.handleSpecialPrice(otherBrand, false);
          }
        });
        
      };  

    return (
      <div className="collection-collapse-block border-0 open">
      <h3 className="collapse-block-title" onClick={toggle}>
      Precio Especial
      </h3>
      <Collapse isOpen={isOpen}>
        <div className="collection-collapse-block-content">
          <div className="collection-size-filter">
            { specialPricesOptions.length > 0 &&
                specialPricesOptions.map((sp, index) => (
                  <div key={index}
                    className="form-check custom-checkbox collection-filter-checkbox"
                  
                  >
                    <Input
                    checked={index === selectedCheckbox}
                    onChange={() => handleCheckboxChange(index, sp)}
                      type="checkbox"
                      className="custom-control-input"
                      id={sp}
                    />

                    <label className="custom-control-label" htmlFor={sp}>
                      {sp}
                    </label>
                  </div>
                ))}
          </div>
        </div>
      </Collapse>
    </div>
    );
}

export default SpecialPrice;