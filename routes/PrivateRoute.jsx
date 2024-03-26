import { useContext, useEffect } from "react";
import UserContext from "../helpers/user/UserContext";
import { useRouter } from "next/router";

const PrivateRoute = ({ children }) => {
  const userContext = useContext(UserContext);
  
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
