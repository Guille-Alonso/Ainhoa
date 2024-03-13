import React, { useState } from "react";
import UserContext from "./UserContext";
import axios from "../../config/axios";
import { useRouter } from "next/router";

const UserProvider = (props) => {
    const [user, setUser] = useState(null);
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [botonState, setBotonState] = useState(false);

    const router = useRouter();

    const login = async (values) => {
      setBotonState(true);
      try {
        console.log(values);
        const { data } = await axios.post("/api/login", values);
        console.log(data);
        setAuthenticated(!!data.user);
        setUser(data.user);
        axios.defaults.headers.common["Authorization"] = data.access_token;
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("user", JSON.stringify(data.user));

        router.push("/")
      } catch (error) {
        // toast.error(error.response?.data.message || error.message);
        console.log(error.response.status);
      }
      setBotonState(false);
    };

    const getAuth = () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setLoading(false);
          return setAuthenticated(false);
        }
        axios.defaults.headers.common["Authorization"] = token;
        // const { data } = await axios.get("/users/authStatus");
        setUser(JSON.parse(localStorage.getItem("user")));
        setAuthenticated(true);
      } catch (error) {
        setAuthenticated(false);
        // toast.error("Error de autenticación. Ingrese nuevamente");
        console.log(error);
      }
      setLoading(false);
    };

    const logout = () =>{
      setAuthenticated(false);
      localStorage.clear();
      router.push("/page/account/login");
    }

    const register = async (values) =>{
      setBotonState(true);
      try {
        console.log(values);
        // const { data } = await axios.post("/api/customers/register", values);
        // console.log(data);
        // setAuthenticated(!!data.user);
        // setUser(data.user);
        // axios.defaults.headers.common["Authorization"] = data.access_token;
        // localStorage.setItem("token", data.access_token);
        // localStorage.setItem("user", JSON.stringify(data.user));

        // router.push("/")
      } catch (error) {
        // toast.error(error.response?.data.message || error.message);
        console.log(error.response.status);
      }
      setBotonState(false);
    }

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
        login,
        getAuth,
        logout,
        register
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
