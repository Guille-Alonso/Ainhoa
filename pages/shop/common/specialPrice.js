import React, { useState ,useContext } from 'react';
import { Collapse, Input } from 'reactstrap';

const SpecialPrice = ({special_price, setSpecialPrice}) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);


    const handleCheckboxChange = (value) => {
        setSpecialPrice(special_price === value ? null : value);
      };

      const resetSpecialPrices = ()=>{
        setIsOpen(!isOpen);
        setSpecialPrice(null)
      }

    return (
      <div className="collection-collapse-block open">
        <h3 className="collapse-block-title" onClick={resetSpecialPrices}>
          Precio Especial
        </h3>
        <Collapse isOpen={isOpen}>
          <div className="collection-collapse-block-content">
          <div className="form-check custom-checkbox collection-filter-checkbox">
        <Input
          checked={special_price === 1}
          onChange={() => handleCheckboxChange(1)}
          type="checkbox"
          className="custom-control-input"
        />
        <label className="custom-control-label">Si</label>
      </div>

      <div className="form-check custom-checkbox collection-filter-checkbox">
        <Input
          checked={special_price === 0}
          onChange={() => handleCheckboxChange(0)}
          type="checkbox"
          className="custom-control-input"
        />
        <label className="custom-control-label">No</label>
      </div>
          </div>
        </Collapse>
      </div>
    );
}

export default SpecialPrice;