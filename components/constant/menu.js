export const generateMenuItems = (categories) => {
  const productoItem = {
    title: "Productos",
    type: "sub",
    children: [
      { path: "/shop/left_sidebar", title: "TODOS", type: "link" },
      ...categories.map(category => ({
        path: "/shop/left_sidebar",
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
    {
      title: "Quienes somos",
      type: "link",
      path:"/"
    },
    productoItem,
    {
      title: "Vendé en Ainhoa",
      type: "link",
      path:"/"
    },
    {
      title: "Contacto",
      type: "link",
      path:"/page/account/contact"
    }
   
  ];

  return MENUITEMS;
};

