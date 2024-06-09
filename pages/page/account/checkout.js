import React from 'react';
import CheckoutPage from './common/checkout-page';
import PrivateRoute from '../../../routes/PrivateRoute';

const Checkout = () => {
    return (
        // <CommonLayout parent="home" title="checkout">
        <PrivateRoute key="checkout">

          <CheckoutPage />
        </PrivateRoute>
        // </CommonLayout>
    );
}

export default Checkout;