export const calculateTotal = (products) => {
  let total = 0;
  products?.forEach((producto) => {
    total += parseFloat(producto.price);
  });
  
  total = total.toFixed(2);
  
  return total;
};
