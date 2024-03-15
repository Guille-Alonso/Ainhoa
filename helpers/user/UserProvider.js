import React, { useEffect, useState } from "react";
import UserContext from "./UserContext";
import axios from "../../config/axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

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
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.access_token;
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("user", JSON.stringify(data.user));
        router.push("/")

      } catch (error) {
        toast.error(error.response?.data.message || error.message);
        console.log(error.response.status);
      }
      setBotonState(false);
    };

    const getAuth = () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setLoading(false);
          router.push("/page/account/login")
          return setAuthenticated(false);
        }
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        // const { data } = await axios.get("/users/authStatus");
        setUser(JSON.parse(localStorage.getItem("user")));
        setAuthenticated(true);
      } catch (error) {
        setAuthenticated(false);
        router.push("/page/account/login")
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
      console.log(values);
      setBotonState(true);
      try {
        const { data } = await axios.post("/api/bff-store/customers/register", values);
        console.log(data);
        toast.success("Usuario registrado !")
        router.push("/page/account/login")
      } catch (error) {
        toast.error(error.response?.data.message || error.message);
        console.log(error.response.status);
      }
      setBotonState(false);
    }

    
  const getProducts = async ()=>{
    try {
      const { data } = await axios.get("/api/products?page=1&size=10");
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if(authenticated){
      getProducts();
    }
  }, [authenticated])
  

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
