import React, { useState, useContext } from "react";
import { Collapse } from "reactstrap";
import FilterContext from "../../../helpers/filter/FilterContext";
import { useEffect } from "react";
import UserContext from "../../../helpers/user/UserContext";

const Category = ({categories,setCategory,setFlagCategory}) => {
  const context = useContext(FilterContext);
  const userContext = useContext(UserContext);
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);
  const toggleCategory = () => setIsCategoryOpen(!isCategoryOpen);
  const setSelectedCategory = context.setSelectedCategory;
  const [url, setUrl] = useState();

  const updateCategory = (category) => {
    setSelectedCategory(category);
  };

  const resetCategories = ()=>{
    setIsCategoryOpen(!isCategoryOpen);
    // setCategory(null)
    // context.handleCategories("todas");
  }

  const showAllCategories = () =>{
    setCategory(null)
    context.handleCategories("todas");
    setFlagCategory(false);
  }

  const pillCategories = (id,cat) =>{
    userContext.setFlagSearch(false);
    setFlagCategory(true);
    if(!context.selectedCategoryPill.includes(cat)){
      setCategory(id)
      context.handleCategories(cat.toLowerCase());
    }
  }

  useEffect(() => {
  if(context.selectedCategoryPill.length == 0 && userContext.category_id != null){
    showAllCategories()
  }
  }, [context.selectedCategoryPill])
  

  const parentSet = new Set();

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
                {categories
                  .filter((cat) => cat.parent !== null)
                  .map((cat, index) => {
                    // Verificamos si la categoría ya ha sido mostrada
                    if (!parentSet.has(cat.parent)) {
                      // Si no ha sido mostrada, la mostramos y la agregamos al conjunto
                      parentSet.add(cat.parent);
                      return (
                        <li key={index}>
                          <a onClick={() => pillCategories(cat.id, cat.parent)}>
                            {cat.parent.length > 18
                              ? cat.parent.toUpperCase().slice(0, 20) + "..."
                              : cat.parent.toUpperCase()}
                          </a>
                        </li>
                      );
                    } else {
                      // Si ya ha sido mostrada, no la mostramos nuevamente
                      return null;
                    }
                  })}
              </ul>
            </div>
          </div>
        </Collapse>
      </div>
    </>
  );
};

export default Category;
