export function obtenerPrecioExtremo(productos) {
  // Inicializar los precios mínimo y máximo con valores válidos
  let precioMinimo = Number.MAX_VALUE;
  let precioMaximo = Number.MIN_VALUE;

  // Iterar sobre los productos para encontrar los precios extremos
  productos?.forEach(producto => {
    // Obtener el precio a considerar (special_price si está presente, de lo contrario, price)
    const precio = producto.special_price !== null ? parseFloat(producto.special_price) : parseFloat(producto.price);
    
    // Actualizar el precio mínimo si el precio actual es menor
    if (precio < precioMinimo) {
      precioMinimo = precio;
    }

    // Actualizar el precio máximo si el precio actual es mayor
    if (precio > precioMaximo) {
      precioMaximo = precio;
    }
  });

  // Devolver los precios extremos
  return { precioMinimo, precioMaximo };
}
