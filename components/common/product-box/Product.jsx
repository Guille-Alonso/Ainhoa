import React from 'react'
import { Media } from 'reactstrap'

const Product = ({product}) => {
    console.log(product);
  return (
    <div className="front" >
    <Media src={ product.images[0].main} className="img-fluid" alt="" />
  </div>
  )
}

export default Product