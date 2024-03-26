export const generateMenuItems = (categories) => {
  const productoItem = {
    title: "Productos",
    type: "sub",
    children: [
      { path: "/", title: "TODOS", type: "link" },
      ...categories.map(category => ({
        path: "/",
        title: category.name,
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
    productoItem,

    {
      title: "Nosotros",
      type: "link",
      path:"/"
    },
    {
      title: "Preguntas Frecuentes",
      type: "link",
      path:"/"
    }
  ];

  return MENUITEMS;
};

