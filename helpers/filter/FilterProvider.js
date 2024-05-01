import React, { useState } from "react";
import FilterContext from "./FilterContext";
import { useRouter } from "next/router";

const FilterProvider = (props) => {
  const router = useRouter();
  const brand = router.query.brand;
  const color = router.query.color;
  const size = router.query.size;
  const specialPrice = router.query.specialPrice;
  const newAndUsed = router.query.newAndUsed;
  const categoryPill = router.query.categoryPill;
  const category = router.query.category;
  const min = router.query.min;
  const max = router.query.max;
  let sizeParam = size ? size.split(",") : null;
  let specialPriceParam = specialPrice ? specialPrice.split(",") : null;
  let newAndUsedParam = newAndUsed ? newAndUsed.split(",") : null;
  let param = brand ? brand.split(",") : [];
  const [selectedCategory, setSelectedCategory] = useState(
    category ? category : "fashion"
  );
  const [selectedBrands, setSelectedBrands] = useState(param ? param : []);
  const [selectedColor, setSelectedColor] = useState(color ? color : "");
  const [selectedSize, setSelectedSize] = useState(sizeParam ? sizeParam : []);
  const [selectedCategoryPill, setSelectedCategoryPill] = useState(categoryPill ? categoryPill : []);

  const [selectedSpecialPrice, setSelectedSpecialPrice] = useState(specialPriceParam ? specialPriceParam : []);
  const [selectedNewAndUsed, setSelectedNewAndUsed] = useState(newAndUsedParam ? newAndUsedParam : []);

  const [selectedPrice, setSelectedPrice] = useState({
    min: min ? min : 0,
    max: max ? max : 500,
  });
  const [isChecked, setIsChecked] = useState(true);
  const [filterChecked, setFilterChecked] = useState([{}]);

const handleBrands = (brand, checked) => {
  const isSelected = selectedBrands.includes(brand);

  if (isSelected && checked) {
    return;
  }

  if (!checked) {
    setSelectedBrands([]);
    return;
  }

  const updatedBrands = isSelected ? selectedBrands.filter(e => e !== brand) : selectedBrands;

  setSelectedBrands([brand]);

  setIsChecked(checked);
  setFilterChecked([{ brand, checked }]);
};

  const handleSizes = (size, checked) => {
    var index = selectedSize.indexOf(size);
    if (index > -1) {
      setIsChecked(!isChecked);
      setFilterChecked([{ size, checked }]);
      setSelectedSize(selectedSize.filter((e) => e !== size));
    } else {
      setIsChecked(!isChecked);
      setFilterChecked([{ size, checked }]);
      setSelectedSize([...selectedSize, size]);
    }
  };

  const handleSpecialPrice = (price, checked) => {
    const isSelected = selectedSpecialPrice.includes(price);
  
    if (isSelected && checked) {
      return;
    }

    if (!checked) {
      setSelectedSpecialPrice([]);
      return;
    }
  
    const updatedPrices = isSelected ? selectedSpecialPrice.filter(e => e !== price) : selectedSpecialPrice;
  
    setSelectedSpecialPrice([price]);
  
    setIsChecked(checked);
    setFilterChecked([{ price, checked }]);
  };

  const handleNewAndUsed = (nau, checked) => {
    const isSelected = selectedNewAndUsed.includes(nau);
  
    if (isSelected && checked) {
      return;
    }

    if (!checked) {
      setSelectedNewAndUsed([]);
      return;
    }
  
    const updatedPrices = isSelected ? selectedNewAndUsed.filter(e => e !== nau) : selectedNewAndUsed;
  
    setSelectedNewAndUsed([nau]);
  
    setIsChecked(checked);
    setFilterChecked([{ nau, checked }]);
  };
  

  const handleCategories = (category) => {
    console.log(category);
    if (category === "todas") {
      // Si la categoría seleccionada es "TODAS", vaciamos el array
      setSelectedCategoryPill(categoryPill ? categoryPill : []);
      setSelectedBrands([])
    } else {
      // Verifica si la categoría ya está seleccionada
      const isCategorySelected = selectedCategoryPill.includes(category);
  
      if (isCategorySelected) {
        // Si la categoría ya está seleccionada, la quitamos
        const newSelectedCategories = selectedCategoryPill.filter((c) => c !== category);
        setSelectedCategoryPill(newSelectedCategories);
      } else {
        // Si la categoría no está seleccionada, la agregamos y quitamos las demás
        setSelectedCategoryPill([category]);
      }
      setSelectedBrands([])
    }
  };
  

  return (
    <FilterContext.Provider
      value={{
        ...props,
        state: selectedCategory,
        setSelectedColor,
        setSelectedCategory,
        setSelectedBrands,
        selectedBrands,
        selectedColor,
        selectedPrice,
        isChecked,
        filterChecked,
        selectedSize,
        setSelectedSize,
        setSelectedPrice,
        handleBrands: handleBrands,
        handleSizes: handleSizes,
        handleCategories : handleCategories,
        selectedCategoryPill,
        setSelectedCategoryPill,
        handleSpecialPrice,
        selectedSpecialPrice,
        setSelectedSpecialPrice,
        handleNewAndUsed,
        selectedNewAndUsed,
        setSelectedNewAndUsed
      }}
    >
      {props.children}
    </FilterContext.Provider>
  );
};

export default FilterProvider;
