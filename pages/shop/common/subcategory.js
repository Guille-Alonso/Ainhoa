import React, { useState, useContext, useEffect } from "react";
import { Collapse } from "reactstrap";
import FilterContext from "../../../helpers/filter/FilterContext";
import UserContext from "../../../helpers/user/UserContext";

const Subcategory = ({categories,setCategory,setFlagCategory}) => {
  const context = useContext(FilterContext);
  const userContext = useContext(UserContext);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
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

  const parentCategories = new Set(categories.filter(category => category.parent != null).map(category => category.parent));
  console.log(parentCategories);
  // Paso 2: Filtrar las categorías
  const filteredCategories = categories.filter(category => {
    // Si la categoría es un padre o su nombre no está en el conjunto de categorías padres, la incluimos
    return category.parent !== null || !parentCategories.has(category.name);
  });

  useEffect(() => {
    if(userContext.flagCategory){
        setIsCategoryOpen(true);
    }
  }, [userContext.flagCategory])
  
  return (
    <>
      <div className="collection-collapse-block open">
        <h3 className="collapse-block-title" onClick={resetCategories}>
          Subcategoría
        </h3>
        <Collapse isOpen={isCategoryOpen}>
          <div className="collection-collapse-block-content">
            <div className="collection-brand-filter">
              <ul className="category-list">
                {/* Agregar la opción "Todas" */}
                {userContext.flagCategory && (
                  <li>
                    <a onClick={showAllCategories}>TODAS</a>
                  </li>
                )}
                {/* Mapear las categorías */}
                {userContext.flagCategory &&
                  categories
                    .filter(
                      (cat) =>
                        cat.parent != null &&
                        userContext.categories.find(
                          (c) => c.id == userContext.category_id
                        )?.parent == cat.parent
                    )
                    .map((cat, index) => (
                      <li key={index}>
                        <a onClick={() => pillCategories(cat.id, cat.name)}>
                          {cat.name.length > 18
                            ? cat.name.toUpperCase().slice(0, 20) + "..."
                            : cat.name.toUpperCase()}
                        </a>
                      </li>
                    ))}

                {!userContext.flagCategory &&
                  filteredCategories.map((cat, index) => (
                    <li key={index}>
                      <a onClick={() => pillCategories(cat.id, cat.name)}>
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

export default Subcategory;