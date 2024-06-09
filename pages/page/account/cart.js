import React from 'react';
import CartPage from './common/cart-page';
import PrivateRoute from '../../../routes/PrivateRoute';

const Wishliat = () => {
    
    return (
        // <CommonLayout parent="home" title="cart">
        <PrivateRoute key="cart">
          <CartPage />
        </PrivateRoute>
        // {/* </CommonLayout> */}
    );
}

export default Wishliat;