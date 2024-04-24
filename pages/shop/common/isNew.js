import React, { useState ,useContext } from 'react';
import { Collapse, Input } from 'reactstrap';
import FilterContext from '../../../helpers/filter/FilterContext';

const IsNew = ({is_new, setIsnew}) => {
    const [isOpen, setIsOpen] = useState(false);
    const context = useContext(FilterContext);
    const [selectedCheckbox, setSelectedCheckbox] = useState(null);
    const toggle = () => setIsOpen(!isOpen);

    const isNewOptions = ["Nuevo","Usado"];

    const handleCheckboxChange = (index, brand) => {
      // Deseleccionar el checkbox actual si ya estaba seleccionado, de lo contrario, seleccionarlo
      setSelectedCheckbox(prevIndex => prevIndex === index ? null : index);
    
      // Crear el atributo con el formato adecuado o null si se está deseleccionando
      const cadena = selectedCheckbox === index ? null : `${brand == "Nuevo"? 1 : 0}`;
      setIsnew(cadena);
    
      // Manejar la selección/deselección del checkbox actual en el contexto
      context.handleNewAndUsed(brand, selectedCheckbox !== index);
    
      // Deseleccionar los checkboxes de los otros atributos
      isNewOptions.forEach((otherBrand, i) => {
        if (i !== index && i !== selectedCheckbox && selectedCheckbox !== null) {
          const otherCadena = `${otherBrand}`;
          context.handleNewAndUsed(otherBrand, false);
        }
      });
      
    }; 

    return (
      <div className="collection-collapse-block border-0 open">
      <h3 className="collapse-block-title" onClick={toggle}>
      Nuevo / Usado
      </h3>
      <Collapse isOpen={isOpen}>
        <div className="collection-collapse-block-content">
          <div className="collection-size-filter">
            { isNewOptions.length > 0 &&
                isNewOptions.map((isNew, index) => (
                  <div key={index}
                    className="form-check custom-checkbox collection-filter-checkbox"
                  
                  >
                    <Input
                    checked={index === selectedCheckbox}
                    onChange={() => handleCheckboxChange(index, isNew)}
                      type="checkbox"
                      className="custom-control-input"
                      id={isNew}
                    />

                    <label className="custom-control-label" htmlFor={isNew}>
                      {isNew}
                    </label>
                  </div>
                ))}
          </div>
        </div>
      </Collapse>
    </div>
    );
}

export default IsNew;