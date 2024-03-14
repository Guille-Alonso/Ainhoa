import React, { useContext, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import UserContext from "../../../helpers/user/UserContext";

const TopBarDark = ({ topClass, fluid }) => {
  // const router = useRouter();
  // const Logout = () => {
  //   localStorage.setItem("user", false);
  //   router.push("/page/account/login-auth");
  // };
  const userContext = useContext(UserContext);

  useEffect(() => {
  userContext.getAuth()
  }, [])

  return (
    <div className={topClass}>
      <Container fluid={fluid}>
        <Row>
          <Col lg="6">
            <div className="header-contact">
              <ul>
                <li>Welcome to Our store Multikart</li>
                <li>
                  <i className="fa fa-phone text-white" aria-hidden="true"></i>
                  Call Us: 123 - 456 - 7890
                </li>
              </ul>
            </div>
          </Col>
          <Col lg="6" className="text-end">
            <ul className="header-dropdown">
              {
                  userContext.authenticated &&
              <li className="mobile-wishlist">
                <Link href="/page/account/wishlist">
                  {/* <a> */}
                  <i className="fa fa-heart" aria-hidden="true"></i> Favs
                  {/* </a> */}
                </Link>
              </li>
              }
              <li className="onhover-dropdown mobile-account">
                <i className="fa fa-user" aria-hidden="true"></i>{userContext.authenticated ? userContext.user.name: "Mi Cuenta"}
                <ul className="onhover-show-div">
                  {
                    !userContext.authenticated &&
                  <li>
                    <Link href={`/page/account/login`}>
                     
                      Iniciar Sesión
                  
                    </Link>
                  </li>
                  }
                  {
                    !userContext.authenticated &&
                  <li>
                    <Link href={`/page/account/register`}>
                      {/* <a> */}
                      Registrarse
                      {/* </a> */}
                    </Link>
                  </li>
                  }
                  {
                    userContext.authenticated &&
                  <li onClick={() => userContext.logout()}>
                    <a>Cerrar Sesión</a>
                  </li>
                  }
                </ul>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default TopBarDark;
