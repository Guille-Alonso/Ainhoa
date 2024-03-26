import React, { useState ,useContext } from 'react';
import { Collapse, Input } from 'reactstrap';

const IsNew = ({is_new, setIsnew}) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);


    const handleCheckboxChange = (value) => {
        setIsnew(is_new === value ? null : value);
      };

      const resetIsNew = ()=>{
        setIsOpen(!isOpen);
        setIsnew(null)
      }

    return (
      <div className="collection-collapse-block open">
        <h3 className="collapse-block-title" onClick={resetIsNew}>
          Nuevo / Usado
        </h3>
        <Collapse isOpen={isOpen}>
          <div className="collection-collapse-block-content">
          <div className="form-check custom-checkbox collection-filter-checkbox">
        <Input
          checked={is_new === 1}
          onChange={() => handleCheckboxChange(1)}
          type="checkbox"
          className="custom-control-input"
        />
        <label className="custom-control-label">Nuevo</label>
      </div>

      <div className="form-check custom-checkbox collection-filter-checkbox">
        <Input
          checked={is_new === 0}
          onChange={() => handleCheckboxChange(0)}
          type="checkbox"
          className="custom-control-input"
        />
        <label className="custom-control-label">Usado</label>
      </div>

      {/* <div className="form-check custom-checkbox collection-filter-checkbox">
        <Input
          checked={is_new === null}
          onChange={() => handleCheckboxChange(null)}
          type="checkbox"
          className="custom-control-input"
        />
        <label className="custom-control-label">Ambos</label>
      </div> */}
          </div>
        </Collapse>
      </div>
    );
}

export default IsNew;