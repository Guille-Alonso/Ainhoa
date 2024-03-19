export const productAttributes = (products)=>{
  const attributesMap = {};

  // Iterar sobre cada producto y sus atributos
  products.forEach(producto => {
    producto.attributes.forEach(({ name, value }) => {
      if (!attributesMap[name]) {
        // Si el atributo no existe en el objeto, se crea un array con el valor
        attributesMap[name] = [value];
      } else if (!attributesMap[name].includes(value)) {
        // Si el valor no existe en el array del atributo, se agrega
        attributesMap[name].push(value);
      }
    });
  });
  
  // Convertir el objeto de atributos a un array de objetos
  const attributesArray = Object.entries(attributesMap).map(([name, values]) => ({
    name,
    values
  }));

  return attributesArray;
}