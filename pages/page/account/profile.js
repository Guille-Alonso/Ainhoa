import React from 'react';
import CommonLayout from '../../../components/shop/common-layout';
import ProfilePage from './common/profile-page';
import PrivateRoute from '../../../routes/PrivateRoute';

const Profile = () => {
    return (
        // <CommonLayout parent="home" title="profile">
        <PrivateRoute key="profile">
            <ProfilePage/>
        </PrivateRoute>
        // </CommonLayout>        
    )
}

export default Profile;