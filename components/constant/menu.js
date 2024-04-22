export const generateMenuItems = (categories) => {
  const productoItem = {
    title: "Productos",
    type: "sub",
    children: [
      { path: "/shop/left_sidebar", title: "TODOS", type: "link" },
      ...categories.map(category => ({
        path: "/shop/left_sidebar",
        title: category.name.length > 18 ? category.name.toUpperCase().slice(0, 16)+"...":category.name.toUpperCase(),
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
      title: "Vendé en Ainhoa",
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

