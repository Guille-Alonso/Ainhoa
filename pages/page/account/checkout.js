import React, { useEffect, useState } from 'react';
import CommonLayout from '../../../components/shop/common-layout';
import CheckoutPage from './common/checkout-page';
import Login from '../../page/account/login-auth'
import PrivateRoute from '../../../routes/PrivateRoute';

const Checkout = () => {
    // const [currentUser, setCurrentUser] = useState(localStorage.getItem('user'));
    // useEffect(() => {
    //     setCurrentUser(localStorage.getItem('user'))
    // }, [localStorage.getItem('user')])

    return (
      // <>
      //     {currentUser !== null ?
      //         <CommonLayout parent="home" title="checkout">
      //             <CheckoutPage />
      //         </CommonLayout>
      //         :
      //         <Login />
      //     }
      // </>
     
        // <CommonLayout parent="home" title="checkout">
        <PrivateRoute>

          <CheckoutPage />
        </PrivateRoute>
        // </CommonLayout>
    );
}

export default Checkout;