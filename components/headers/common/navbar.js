import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
// import { MENUITEMS } from "../../constant/menu";
import { generateMenuItems } from "../../constant/menu";
import { Container, Row } from "reactstrap";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import UserContext from "../../../helpers/user/UserContext";
import FilterContext from "../../../helpers/filter/FilterContext";

const NavBar = () => {
  const { t } = useTranslation();
  const [navClose, setNavClose] = useState({ right: "-410px" });
  const router = useRouter();
  const userContext = useContext(UserContext);

  useEffect(() => {
    if (window.innerWidth < 750) {
      setNavClose({ right: "-410px" });
    }
    if (window.innerWidth < 1199) {
      setNavClose({ right: "-300px" });
    }
  }, []);

  const openNav = () => {
    setNavClose({ right: "0px" });
    if (router.asPath == "/layouts/Gym")
      document.querySelector("#topHeader").classList.add("zindex-class");
  };

  const contextFilter = useContext(FilterContext);

  const closeNav = (cat) => {
    if(cat){
      if(cat != "TODOS"){
        const cleanedCatName = cat.replace(/\.{3}/g, ''); // Eliminar puntos suspensivos de 'cat'
        const idCat = userContext.categories.find(c=> c.name.toUpperCase().includes(cleanedCatName.toUpperCase()))?.id;
        userContext.setCategory(idCat)

        if(!contextFilter.selectedCategoryPill.includes(cat)){
          contextFilter.handleCategories(cat.toLowerCase());
        }
        userContext.setFlagCategory(true);
      }else {
        contextFilter.handleCategories("todas");
        userContext.setFlagCategory(false);
        userContext.getProductsToFilter("/api/bff-store/products");
      }
    }
    setNavClose({ right: "-410px" });
    if (router.asPath == "/layouts/Gym")
      document.querySelector("#topHeader").classList.remove("zindex-class");
  };

  const handleMegaSubmenu = (event) => {
    if (event.target.classList.contains("sub-arrow")) return;

    if (
      event.target.parentNode.nextElementSibling.classList.contains(
        "opensubmegamenu"
      )
    )
      event.target.parentNode.nextElementSibling.classList.remove(
        "opensubmegamenu"
      );
    else {
      document.querySelectorAll(".menu-content").forEach(function (value) {
        value.classList.remove("opensubmegamenu");
      });
      event.target.parentNode.nextElementSibling.classList.add(
        "opensubmegamenu"
      );
    }
  };

  const MENUITEMS = generateMenuItems(userContext.categories)
  const [mainmenu, setMainMenu] = useState(MENUITEMS);
  useEffect(() => {
    const currentUrl = location.pathname;
    MENUITEMS.filter((items) => {
      if (items.path === currentUrl) setNavActive(items);
      if (!items.children) return false;
      items.children.filter((subItems) => {
        if (subItems.path === currentUrl) setNavActive(subItems);
        if (!subItems.children) return false;
        subItems.children.filter((subSubItems) => {
          if (subSubItems.path === currentUrl) setNavActive(subSubItems);
        });
      });
    });
  }, []);

  const setNavActive = (item) => {
    MENUITEMS.filter((menuItem) => {
      if (menuItem != item) menuItem.active = false;
      if (menuItem.children && menuItem.children.includes(item))
        menuItem.active = true;
      if (menuItem.children) {
        menuItem.children.filter((submenuItems) => {
          if (submenuItems.children && submenuItems.children.includes(item)) {
            menuItem.active = true;
            submenuItems.active = false;
          }
        });
      }
    });

    setMainMenu({ mainmenu: MENUITEMS });
  };

  // Click Toggle menu
  const toggletNavActive = (item) => {
    console.log(item);
    if (!item.active) {
      MENUITEMS.forEach((a) => {
        if (MENUITEMS.includes(item)) a.active = false;
        if (!a.children) return false;
        a.children.forEach((b) => {
          if (a.children.includes(item)) {
            b.active = false;
          }
          if (!b.children) return false;
          b.children.forEach((c) => {
            if (b.children.includes(item)) {
              c.active = false;
            }
          });
        });
      });
    }
    item.active = !item.active;
    setMainMenu({ mainmenu: MENUITEMS });
  };

  const openMblNav = (event) => {
    if (event.target.classList.contains("sub-arrow")) return;

    if (event.target.nextElementSibling.classList.contains("opensubmenu"))
      event.target.nextElementSibling.classList.remove("opensubmenu");
    else {
      document.querySelectorAll(".nav-submenu").forEach(function (value) {
        value.classList.remove("opensubmenu");
      });
      document
        .querySelector(".mega-menu-container")
        ?.classList.remove("opensubmenu");
      event.target.nextElementSibling.classList.add("opensubmenu");
    }
  };

  const [flag,setFlag] = useState(false);

  function toggleActive(title) {
  
    const index = MENUITEMS.filter(mi=>mi.title=="Productos")[0].children.filter(m=>m.type == "sub").findIndex(item => item.title === title.title);
 
    if (index !== -1) {
     
      MENUITEMS.filter(mi=>mi.title=="Productos")[0].children.filter(m=>m.type == "sub")[index].active = !MENUITEMS.filter(mi=>mi.title=="Productos")[0].children.filter(m=>m.type == "sub")[index].active;
      // console.log(updatedElemento.active);
  
      setFlag(!flag)
    }
   
    console.log(MENUITEMS);
  }
  

  return (
    <div>
      <div className="main-navbar">
        <div id="mainnav">
          <div className="toggle-nav" onClick={openNav.bind(this)}>
            <i className="fa fa-bars sidebar-bar"></i>
          </div>
          <ul className="nav-menu" style={navClose}>
            <li className="back-btn" onClick={closeNav.bind(this,null)}>
              <div className="mobile-back text-end">
                <span>Menu</span>
                <i className="fa fa-angle-right ps-2" aria-hidden="true"></i>
              </div>
            </li>
            {MENUITEMS.map((menuItem, i) => {
              return (
                <li
                  key={i}
                  className={` ${menuItem.megaMenu ? "mega-menu" : ""}`}>
                  {menuItem.type == "link" ? (
                    <Link  onClick={closeNav.bind(this,null)} href={menuItem.path} className={menuItem.title != "Inicio"? "nav-link": "nav-link navLinkInicio"}>
                      {/* <a > */}
                      {t(menuItem.title)}
                      {/* </a> */}
                    </Link>
                  ) : (
                    <a className="nav-link productsMenuItem" onClick={(e) => openMblNav(e)}>
                      {t(menuItem.title)}
                      <span className="sub-arrow"></span>
                    </a>
                  )}
                  {menuItem.children && !menuItem.megaMenu ? (
                    <ul className="nav-submenu">
                      {menuItem.children.map((childrenItem, index) => {
                        return (
                          <li
                            key={index}
                            className={`${
                              childrenItem.children ? "sub-menu " : ""
                            }`}
                          >

                            {childrenItem.type === "sub" ? (
                              <a
                                href={null}
                                onClick={() => toggletNavActive(childrenItem)}
                                // onClick={(e) => openMblNav(e)}
                              >
                                {childrenItem.title}
                                {childrenItem.tag === "new" ? (
                                  <span className="new-tag">new</span>
                                ) : (
                                  ""
                                )}
                                <i className="fa fa-angle-right ps-2"></i>
                              </a>
                            ) : (
                              ""
                            )}

                            {childrenItem.type === "link" ? (
                              <Link
                                onClick={closeNav.bind(
                                  this,
                                  childrenItem.title
                                )}
                                href={`${childrenItem.path}`}
                              >
                                {/* <a> */}
                                {childrenItem.title}
                                {childrenItem.tag === "new" ? (
                                  <span className="new-tag">new</span>
                                ) : (
                                  ""
                                )}
                                {/* </a> */}
                              </Link>
                            ) : (
                              console.log(childrenItem)
                            )}

                            {childrenItem.type === "sub" ? (
                              <ul
                                className={`nav-sub-childmenu ${
                                   childrenItem.active ? "menu-open " : "active"
                                }`}
                              >
                                {childrenItem.children.map(
                                  (childrenSubItem, key) => (
                                    <li key={key}>
                                
                                      {childrenSubItem.type === "link" ? (
                                        <Link
                                          onClick={closeNav.bind(
                                            this,
                                            childrenSubItem.title
                                          )}
                                          href={`${childrenSubItem.path}`}
                                        >
                                          {/* <a> */}
                                          
                                          {childrenSubItem.title}
                                          {/* {childrenSubItem.tag === "new" ? (
                                            <span className="new-tag">new</span>
                                          ) : (
                                            ""
                                          )} */}
                                          {/* </a> */}
                                        </Link>
                                      ) : (
                                        "ee"
                                      )}
                                    </li>
                                  )
                                )}
                              </ul>
                            ) : (
                              console.log(childrenItem)
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <>
                      {menuItem.type !== "link" && (
                        <div
                          className={`mega-menu-container${
                            menuItem.megaMenu ? "" : " opensubmenu"
                          }`}>
                          {menuItem.megaMenu === true ? (
                            <Container>
                              <Row>
                                {menuItem.children.map((megaMenuItem, i) => {
                                  return (
                                    <div
                                      className={`${
                                        menuItem.megaMenuType == "small"
                                          ? "col mega-box"
                                          : menuItem.megaMenuType == "medium"
                                          ? "col-lg-3"
                                          : menuItem.megaMenuType == "large"
                                          ? "col"
                                          : ""
                                      } `}
                                      key={i}>
                                      <div className="link-section">
                                        <div className="menu-title">
                                          <h5
                                            onClick={(e) =>
                                              handleMegaSubmenu(e)
                                            }>
                                            {megaMenuItem.title}
                                          </h5>
                                        </div>
                                        <div className="menu-content">
                                          <ul>
                                            {menuItem.title === "Elements"
                                              ? megaMenuItem.children.map(
                                                  (subMegaMenuItem, i) => {
                                                    return (
                                                      <li key={i}>
                                                        <Link
                                                          href={
                                                            subMegaMenuItem.path
                                                          }>
                                                          <>
                                                            <i
                                                              className={`icon-${subMegaMenuItem.icon}`}></i>
                                                            {
                                                              subMegaMenuItem.title
                                                            }
                                                          </>
                                                        </Link>
                                                      </li>
                                                    );
                                                  }
                                                )
                                              : megaMenuItem.children.map(
                                                  (subMegaMenuItem, i) => {
                                                    return (
                                                      <li key={i}>
                                                        <Link
                                                          href={
                                                            subMegaMenuItem.path
                                                          }>
                                                          {
                                                            subMegaMenuItem.title
                                                          }
                                                        </Link>
                                                      </li>
                                                    );
                                                  }
                                                )}
                                          </ul>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })}
                              </Row>
                            </Container>
                          ) : (
                            ""
                          )}
                        </div>
                      )}
                    </>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
