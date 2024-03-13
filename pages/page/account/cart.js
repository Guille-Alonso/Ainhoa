import React, { useEffect } from 'react';
import CommonLayout from '../../../components/shop/common-layout';
import CartPage from './common/cart-page';
import PrivateRoute from '../../../routes/PrivateRoute';


const Wishliat = () => {
    
    return (
      <CommonLayout parent="home" title="cart">
        <PrivateRoute>
          <CartPage />
        </PrivateRoute>
      </CommonLayout>
    );
}

export default Wishliat;