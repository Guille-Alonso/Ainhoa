import React, { useState, useContext } from "react";
import { Collapse } from "reactstrap";
import FilterContext from "../../../helpers/filter/FilterContext";

const Category = ({categories,setCategory}) => {
  const context = useContext(FilterContext);
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);
  const toggleCategory = () => setIsCategoryOpen(!isCategoryOpen);
  const setSelectedCategory = context.setSelectedCategory;
  const [url, setUrl] = useState();

  const updateCategory = (category) => {
    setSelectedCategory(category);
  };

  const resetCategories = ()=>{
    setIsCategoryOpen(!isCategoryOpen);
    setCategory(null)
  }

  const showAllCategories = () =>{
    setCategory(null)
  }

  return (
    <>
      <div className="collection-collapse-block open">
        <h3 className="collapse-block-title" onClick={resetCategories}>
          Categoría
        </h3>
        <Collapse isOpen={isCategoryOpen}>
          <div className="collection-collapse-block-content">
            <div className="collection-brand-filter">
              <ul className="category-list">
                {/* Agregar la opción "Todas" */}
                <li>
                  <a onClick={showAllCategories}>TODAS</a>
                </li>
                {/* Mapear las categorías */}
                {categories.map((cat, index) => (
                  <li key={index}>
                    <a onClick={() => setCategory(cat.id)}>
                      {cat.name.length > 18
                        ? cat.name.toUpperCase().slice(0, 20) + "..."
                        : cat.name.toUpperCase()}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Collapse>
      </div>
    </>
  );
};

export default Category;
