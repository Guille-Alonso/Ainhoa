import React, { useState } from "react";
import UserContext from "./UserContext";
import axios from "../../config/axios";

const UserProvider = (props) => {
    const [user, setUser] = useState(null);
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [botonState, setBotonState] = useState(false);

    const login = async (values) => {
      setBotonState(true);
      try {
        console.log(values);
        const { data } = await axios.post("/api/login", values);
        console.log(data);
        // setAuthenticated(!!data.user);
        // setUser(data.user);
        // axios.defaults.headers.common["Authorization"] = data.token;
        // localStorage.setItem("token", data.token);
      } catch (error) {
        // toast.error(error.response?.data.message || error.message);
        console.log(error);
      }
      setBotonState(false);
    };

  return (
    <UserContext.Provider
      value={{
        ...props,
        user,
        setUser,
        authenticated,
        setAuthenticated,
        loading,
        setLoading,
        botonState,
        setBotonState,
        login
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
