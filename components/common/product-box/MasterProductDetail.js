import React from "react";

const MasterProductDetail = ({
  product,
  productDetail,
  currency,
  uniqueTags,
  detailClass,
  title,
  des,
  variantChangeByColor,
}) => {
  let RatingStars = [];
  let rating = 5;
  for (var i = 0; i < rating; i++) {
    RatingStars.push(<i className="fa fa-star" key={i}></i>);
  }

  return (
    <div className={`product-detail ${productDetail} ${detailClass}`}>
      <div>
        {/* {title !== "Product style 4" ? (
          <div className="rating">{RatingStars}</div>
        ) : (
          ""
        )} */}
        <h5>{product.name.toUpperCase()}</h5>
        <h6 className="mb-1">  
        {product.category.charAt(0).toUpperCase() + product.category.slice(1).toLowerCase()}
        {product.category.length > 10 ? "..." : ""}
</h6>
        {/* {des ? <p>{product.description}</p> : ""} */}
        {/* <p>{product.category}</p> */}
        <h4>
          {currency.symbol}
          {/* {(
            (product.price - (product.price * product.discount) / 100) *
            currency.value
          ).toFixed(2)} */}
          {product.sale_price}
          <del>
            <span className="money">
              {/* {currency.symbol} */}
              {product.price == product.sale_price? "":<span>{currency.symbol} {product.price} </span>}
            </span>
          </del>
        </h4>

        {/* {product.variants.map((vari) => {
          var findItem = uniqueTags.find((x) => x.color === vari.color);
          if (!findItem) uniqueTags.push(vari);
        })} */}

        {product.type === "jewellery" ||
        product.type === "nursery" ||
        product.type === "beauty" ||
        product.type === "electronics" ||
        product.type === "goggles" ||
        product.type === "watch" ||
        product.type === "pets" ? (
          ""
        ) : (
          <>
            {/* {title !== "Product style 4" && uniqueTags[0].color ? (
              <ul className="color-variant">
                {uniqueTags.map((vari, i) => {
                  return (
                    <li
                      className={vari.color}
                      key={i}
                      title={vari.color}
                      onClick={() =>
                        variantChangeByColor(vari.image_id, product.images)
                      }
                    ></li>
                  );
                })}
              </ul>
            ) : (
              ""
            )} */}
          </>
        )}
      </div>
    </div>
  );
};

export default MasterProductDetail;
