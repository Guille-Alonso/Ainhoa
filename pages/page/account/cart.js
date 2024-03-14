import React, { useContext, useEffect } from 'react';
import CommonLayout from '../../../components/shop/common-layout';
import CartPage from './common/cart-page';
import PrivateRoute from '../../../routes/PrivateRoute';
import UserContext from '../../../helpers/user/UserContext';


const Wishliat = () => {
    
    return (
      <PrivateRoute>
        <CommonLayout parent="home" title="cart">
          <CartPage />
        </CommonLayout>
      </PrivateRoute>
    );
}

export default Wishliat;