export const generateMenuItems = (categories) => {
  // const productoItem = {
  //   title: "Productos",
  //   type: "sub",
  //   children: [
  //     { path: "/shop/left_sidebar", title: "TODOS", type: "link" },
  //     ...categories.map(category => ({
  //       path: "/shop/left_sidebar",
  //       title: category.name.length > 18 ? category.name.toUpperCase().slice(0, 16)+"...":category.name.toUpperCase(),
  //       type: "link"
  //     }))
  //   ]
  // };

 // Paso 1: Crear un conjunto de categorías padres
const parentCategories = new Set(categories.filter(category => category.parent != null).map(category => category.parent));
// Paso 2: Filtrar las categorías
const filteredCategories = categories.filter(category => {
  // Si la categoría es un padre o su nombre no está en el conjunto de categorías padres, la incluimos
  return category.parent !== null || !parentCategories.has(category.name);
});

  const productoItem = {
    title: "Productos",
    type: "sub",
    children: [
      { path: "/shop/left_sidebar", title: "TODOS", type: "link" },
      ...filteredCategories
        .filter((category, index, self) => {
          // Filtrar las categorías que tienen el mismo parent y solo mantener una de ellas
          return category.parent !== null && index === self.findIndex((c) => c.parent === category.parent);
        })
        .map(category => ({
          // Mapear para obtener solo los nombres de las categorías
          title: category.parent.toUpperCase(),
          type: "sub",
          children: filteredCategories
            .filter(child => child.parent === category.parent)
            .map(child => ({
              path: "/shop/left_sidebar", // Ajusta el camino según sea necesario
              title: child.name.length > 18 ? child.name.toUpperCase().slice(0, 14)+"...":child.name.toUpperCase(),
              type: "link"
            }))
        })),
      ...filteredCategories
        .filter(category => category.parent === null)
        .map(category => ({
          // Si el atributo "parent" es null, asignar el tipo "link"
          path: "/shop/left_sidebar",
          title: category.name.length > 18 ? category.name.toUpperCase().slice(0, 16) + "..." : category.name.toUpperCase(),
          type: "link"
        }))
    ]
  };
  
  const MENUITEMS = [
    {
      title: "Inicio",
      type: "link",
      path:"/"
    },
    {
      title: "Quienes somos",
      type: "link",
      path:"/page/about-us"
    },
    productoItem,
    {
      title: "Vendé con Ainhoa",
      type: "link",
      path:"/page/vendor/become-vendor"
    },
    {
      title: "Contacto",
      type: "link",
      path:"/page/account/contact"
    }
   
  ];

  return MENUITEMS;
};

