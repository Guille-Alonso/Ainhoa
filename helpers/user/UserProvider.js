import React, { useEffect, useState } from "react";
import UserContext from "./UserContext";
import axios from "../../config/axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import useGet from "../../utils/useGet";

const UserProvider = (props) => {
    const [user, setUser] = useState(null);
    const [cart, setCart] = useState(null);
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [botonState, setBotonState] = useState(false);

    const [products,loadingProducts,getProducts] = useGet("/api/bff-store/products?page=1",axios)

    const router = useRouter();

    const login = async (values) => {
      setBotonState(true);
      try {
        console.log(values);
        const { data } = await axios.post("/api/bff-store/auth/login", values);
        console.log(data);
        setAuthenticated(!!data.user);
        setUser(data.user);
        setCart(data.cart)
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.access_token;
        localStorage.setItem("token", data.access_token);
        // localStorage.setItem("user", JSON.stringify(data.user));
        router.push("/")

      } catch (error) {
        toast.error(error.response?.data.message || error.message);
        console.log(error.response.status);
      }
      setBotonState(false);
    };

    const getAuth = async () => {
      try {
        console.log("hola");
        const token = localStorage.getItem("token");
        if (!token) {
          setLoading(false);
          router.push("/page/account/login")
          return setAuthenticated(false);
        }
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        const { data } = await axios.get("/api/bff-store/private/auth/user");
        console.log(data);
        setUser(data.user);
        setAuthenticated(true);
        setCart(data.cart)
      } catch (error) {
        setAuthenticated(false);
        router.push("/page/account/login")
        // toast.error("Error de autenticación. Ingrese nuevamente");
        console.log(error);
      }
      setLoading(false);
    };

    const logout = async () =>{
      setAuthenticated(false);
      localStorage.clear();
      router.push("/page/account/login");
      try {
        const {data} = await axios.post("/api/bff-store/private/auth/logout")
        console.log(data);
      } catch (error) {
        console.log(error);
      }
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

    const addProductToCart = async (product,qty) => {
      try {
        if(cart.products.find(p=>p.code ==product.code)){
          toast.error("El producto ya fue agregado al carrito");
        }else{
          const productToAdd = {"product": product.code,"qty":qty}
          const {data} = await axios.post("/api/bff-store/private/carts/products",productToAdd)
          console.log(data);
          toast.success("Product Added Successfully !");
          setCart((prevCart) => ({
            ...prevCart,
            products: [...prevCart.products, product]
          }));
        }
        getProducts();
      } catch (error) {
        console.log(error);
      }
    };

    const removeProductFromCart = async (code) => {
      try {
       const {data} = await axios.delete(`/api/bff-store/private/carts/products/${code}`)
        console.log(data);
        toast.error("Product Removed Successfully !");
        setCart((prevCart) => ({
          ...prevCart,
          products: prevCart.products.filter(product => product.code !== code)
        }));
        getProducts();
      } catch (error) {
        
      }
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
        login,
        getAuth,
        logout,
        register,
        products,
        cart,
        addProductToCart,
        removeProductFromCart
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
