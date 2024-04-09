import React, { useState } from "react";
import FilterContext from "./FilterContext";
import { useRouter } from "next/router";

const FilterProvider = (props) => {
  const router = useRouter();
  const brand = router.query.brand;
  const color = router.query.color;
  const size = router.query.size;
  const category = router.query.category;
  const min = router.query.min;
  const max = router.query.max;
  let sizeParam = size ? size.split(",") : null;
  let param = brand ? brand.split(",") : [];
  const [selectedCategory, setSelectedCategory] = useState(
    category ? category : "fashion"
  );
  const [selectedBrands, setSelectedBrands] = useState(param ? param : []);
  const [selectedColor, setSelectedColor] = useState(color ? color : "");
  const [selectedSize, setSelectedSize] = useState(sizeParam ? sizeParam : []);
  const [selectedPrice, setSelectedPrice] = useState({
    min: min ? min : 0,
    max: max ? max : 500,
  });
  const [isChecked, setIsChecked] = useState(true);
  const [filterChecked, setFilterChecked] = useState([{}]);

const handleBrands = (brand, checked) => {
  // Verifica si la marca actual ya está seleccionada
  const isSelected = selectedBrands.includes(brand);

  // Si la marca actual ya está seleccionada y está siendo seleccionada nuevamente,
  // no hacemos nada ya que no se puede seleccionar una marca que ya está seleccionada.
  if (isSelected && checked) {
    return;
  }

  // Si la marca actual no está seleccionada y está siendo deseleccionada,
  // no hacemos nada ya que no se puede deseleccionar una marca que no está seleccionada.
  if (!isSelected && !checked) {
    return;
  }

  // En este punto, sabemos que la marca actual está siendo seleccionada
  // y la marca previamente seleccionada (si existe) debe ser deseleccionada.

  // Si hay una marca previamente seleccionada, la deseleccionamos
  const updatedBrands = isSelected ? selectedBrands.filter(e => e !== brand) : selectedBrands;

  // Establecemos la marca actual como la única seleccionada
  setSelectedBrands([brand]);

  // Actualizamos otros estados según sea necesario
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
      }}
    >
      {props.children}
    </FilterContext.Provider>
  );
};

export default FilterProvider;
