import React, { Fragment, useContext } from "react";
import Link from "next/link";
import { Container, Row, Col, Media } from "reactstrap";
import banner1 from "../../../../public/assets/img/home/banner-left.jpg";
import banner2 from "../../../../public/assets/images/sub-banner2.jpg";
import UserContext from "../../../../helpers/user/UserContext";
import FilterContext from "../../../../helpers/filter/FilterContext";
import { useRouter } from "next/router";

const MasterCollectionBanner = ({img, about, offer, link, classes, indice, userContext, categoryNameEnviroment }) => {

const contextFilter = useContext(FilterContext);
const router = useRouter();
 
const filtrarProductos = ()=>{ 
  //INDICE 1 BANNER FIESTA
  //INDICE 0 TODOS LOS PRODUCTOS
  userContext.setFlagSearch(false);
  if(indice == 1){  
     if(userContext.category_id == process.env.NEXT_PUBLIC_ID_CAT){
      userContext.getProductsToFilter(`/api/bff-store/products?category_id=${process.env.NEXT_PUBLIC_ID_CAT}`);
    }else{
      userContext.setCategory(process.env.NEXT_PUBLIC_ID_CAT);
    }
  if(!contextFilter.selectedCategoryPill.includes(categoryNameEnviroment)){
    contextFilter.handleCategories(categoryNameEnviroment.toLowerCase());
  }

  }else if(indice == 0){
    userContext.setFlagCategory(false);
    contextFilter.handleCategories("todas");
    if(contextFilter.selectedCategoryPill.length > 0 && userContext.category_id != null){
      userContext.setCategory(null);
    }else if(userContext.category_id == null){
      userContext.getProductsToFilter("/api/bff-store/products");
    }
  }
  router.push(link);
}

  return (
    <Col md="6">
      <Link href={link}>
        {/* <a> */}
          <div onClick={filtrarProductos} className={`collection-banner ${classes}`}>
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

  const userContext = useContext(UserContext);

  const categoryNameEnviroment = userContext.categories.find(cat=>cat.id == process.env.NEXT_PUBLIC_ID_CAT) != undefined ? userContext.categories.find(cat=>cat.id == process.env.NEXT_PUBLIC_ID_CAT).name : "FIESTA";

const Data = [
  {
    img: banner1,
    about: "todos",
    offer: "productos",
    link: "/shop/products",
    class: "p-right text-center",
  },
  {
    img: banner2,
    // about: "fiesta",
    about: categoryNameEnviroment,
    offer: "productos",
    link: "/shop/products",
    class: "p-right text-center",
  },
];

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
                  userContext={userContext}
                  categoryNameEnviroment={categoryNameEnviroment}
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
