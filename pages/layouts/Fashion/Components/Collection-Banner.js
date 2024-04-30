import React, { Fragment, useContext } from "react";
import Link from "next/link";
import { Container, Row, Col, Media } from "reactstrap";
import banner1 from "../../../../public/assets/images/sub-banner1.jpg";
import banner2 from "../../../../public/assets/images/sub-banner2.jpg";
import UserContext from "../../../../helpers/user/UserContext";
import FilterContext from "../../../../helpers/filter/FilterContext";

const Data = [
  {
    img: banner1,
    about: "todos",
    offer: "productos",
    link: "/shop/left_sidebar",
    class: "p-right text-center",
  },
  {
    img: banner2,
    about: "fiesta",
    offer: "productos",
    link: "/shop/left_sidebar",
    class: "p-right text-center",
  },
];

const MasterCollectionBanner = ({img, about, offer, link, classes, indice }) => {

const userContext = useContext(UserContext);
const contextFilter = useContext(FilterContext);
 
const filtrarPorFiesta = ()=>{
  userContext.setCategory(process.env.NEXT_PUBLIC_ID_FIESTA);
if(!contextFilter.selectedCategoryPill.includes("Fiesta")){
  contextFilter.handleCategories("Fiesta");
}
}

  return (
    <Col md="6">
      <Link href={link}>
        {/* <a> */}
          <div onClick={indice == 1 ? filtrarPorFiesta : ()=>console.log("")} className={`collection-banner ${classes}`}>
            <Media src={img} className="img-fluid" alt="" />
            <div className="contain-banner">
              <div>
                <h4>{offer}</h4>
                <h2>{about}</h2>
              </div>
            </div>
          </div>
        {/* </a> */}
      </Link>
    </Col>
  );
};

const CollectionBanner = () => {
  return (
    <Fragment>
      {/*collection banner*/}
      <section className="pb-0">
        <Container>
          <Row className="partition2">
            {Data.map((data, i) => {
              return (
                <MasterCollectionBanner
                  key={i}
                  img={data.img.src}
                  about={data.about}
                  link={data.link}
                  offer={data.offer}
                  classes={data.class}
                  indice = {i}
                />
              );
            })}
          </Row>
        </Container>
      </section>
      {/*collection banner end*/}
    </Fragment>
  );
};

export default CollectionBanner;
