import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import UserContext from "../helpers/user/UserContext";

const PrivateRoute = ({ children }) => {
  const userContext = useContext(UserContext);
  const router = useRouter();

  const handleRedirect = () => {
    if (!userContext.authenticated) {
       router.push("/page/account/login");
    }
  };
  
  useEffect(() => {
    if (!userContext.authenticated) {
      handleRedirect();
    }
  }, [userContext.authenticated]);

  useEffect(() => {
    userContext.getAuth()
  }, [])
  

  return userContext.loading ? (
    <div className="loader-wrapper">
      <div className="loader"></div>
    </div>
  ) : userContext.authenticated ? (
    children
  ) : null;
};

export default PrivateRoute;
