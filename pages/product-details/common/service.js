import React from "react";
import MasterServiceContent from "../../../components/common/Service/MasterServiceConternt";
import {
  svgFreeShipping,
  svgservice,
  svgoffer,
  svgpayment,
} from "../../../services/script";
const Data = [
  {
    link: svgFreeShipping,
    title: "Envíos",
    service: "",
  },
  {
    link: svgservice,
    title: "Cambios",
    service: "",
  },
  {
    link: svgoffer,
    title: "Descuentos",
    service: "",
  },
  {
    link: svgpayment,
    title: "Pago online",
    service: "",
    lastChild: true,
  },
];

const Service = () => {
  return (
    <div className="collection-filter-block">
      <div className="product-service">
        {Data.map((data, index) => {
          return (
            <MasterServiceContent
              key={index}
              link={data.link}
              title={data.title}
              service={data.service}
              lastChild={data.lastChild}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Service;
