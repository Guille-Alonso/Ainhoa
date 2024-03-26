import React, { useEffect, useState } from "react";
import UserContext from "./UserContext";
import axios from "../../config/axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import useGet from "../../utils/useGet";

const UserProvider = (props) => {
    const [user, setUser] = useState(null);
    const [cart, setCart] = useState(null);
    const [order, setOrder] = useState(null)
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [botonState, setBotonState] = useState(false);
    const [flagTimer, setFlagTimer] = useState(false);
    const [category_id, setCategory] = useState(null);
    const [products, setProducts] = useState([])

    // const [products,loadingProducts,getProducts,setProducts] = useGet(`/api/bff-store/products?page=1`,axios)
    const [categories,loadingCategories] = useGet("/api/bff-store/categories",axios)

    const router = useRouter();

    const getProductsToFilter = async (url)=>{
      try {
        const {data} = await axios.get(url)
        setProducts(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }

    useEffect(() => {
      let apiUrl = "/api/bff-store/products";
      let queryParams = [];

      const filters = { category_id };

      for (const filter in filters) {
       
        if (filters[filter] !== null && filters[filter] !== undefined && filters[filter] !== -1) {
            queryParams.push(`${filter}=${filters[filter]}`);
        }
    }

      if (queryParams.length > 0) {
        apiUrl += '?' + queryParams.join('&');
      }

    console.log(apiUrl); 
   getProductsToFilter(apiUrl)
      
    }, [category_id])
    

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
        router.push("/")

      } catch (error) {
        toast.error(error.response?.data.message || error.message);
        console.log(error.response.status);
      }
      setBotonState(false);
    };

    const getAuth = async () => {
      try {
       
        const token = localStorage.getItem("token");
        if (!token) {
          setLoading(false);
          // router.push("/")
          return setAuthenticated(false);
        }
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        const { data } = await axios.get("/api/bff-store/private/auth/user");
       
        setUser(data.user);
        setAuthenticated(true);
        setCart(data.cart);
   
      } catch (error) {
        if(error.response.status == 401){
          localStorage.clear();
          setAuthenticated(false);
          toast.error("Error de autenticación. Ingrese nuevamente");
          router.push("/page/account/login")
        }else{
          toast.error(error.response?.data.message || error.message);
        }
        // await logout();
        // setAuthenticated(false);
        // router.push("/page/account/login")
        // toast.error("Error de autenticación. Ingrese nuevamente");
        // console.log(error);
      }
      setLoading(false);
    };

    const logout = async () =>{
      try {

      if(cart?.products.length > 0){
        
       await removeProductsFromCart()
      }

      setAuthenticated(false);
      localStorage.clear();
      setOrder(null);
      router.push("/page/account/login");
      
        const {data} = await axios.post("/api/bff-store/private/auth/logout")
       
      } catch (error) {
        if(error.response.status == 401){
          localStorage.clear();
          setAuthenticated(false);
          toast.error("Error de autenticación. Ingrese nuevamente");
          router.push("/page/account/login")
        }else{
          toast.error(error.response?.data.message || error.message);
        }
        // localStorage.clear();
        // console.log(error);
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
      setBotonState(true);
      setOrder(null);
      try {
        if(cart?.products.find(p=>p.code ==product.code)){
          toast.error("El producto ya fue agregado al carrito");
        }else{
          const productToAdd = {"product": product.code,"qty":qty}
          const {data} = await axios.post("/api/bff-store/private/carts/products",productToAdd)
          console.log(data);
          toast.success("Producto agregado al carrito");
          if(cart){
            const cartObj = {...data}
            delete cartObj.products;
            setCart((prevCart) => ({
              ...cartObj,
              ...prevCart,
              products: [...prevCart?.products, product]
            }));
          }else{
            setCart(data)
          }
          setFlagTimer(!flagTimer)
        }
        // getProducts();
        getProductsToFilter("/api/bff-store/products");
      } catch (error) {
        console.log(error);
        if(error?.response?.status == 401){
          localStorage.clear();
          toast.error("Antes debe ingresar..");
          router.push("/page/account/login")
        }else{
          toast.error(error.response?.data.message || error.message);
        }
      }
      setBotonState(false);
    };

    const comprarAgregarProducto = async (product,qty)=>{
      setBotonState(true);
      setOrder(null);
      try {
        if(cart?.products.find(p=>p.code ==product.code)){
          router.push(`/page/account/checkout`);
        }else{
          const productToAdd = {"product": product.code,"qty":qty}
          const {data} = await axios.post("/api/bff-store/private/carts/products",productToAdd)
          console.log(data);
          toast.info("Ya casi terminas !");
          if(cart){
            const cartObj = {...data}
            delete cartObj.products;
            setCart((prevCart) => ({
              ...cartObj,
              ...prevCart,
              products: [...prevCart?.products, product]
            }));
          }else{
            setCart(data)
          }
          setFlagTimer(!flagTimer)
          router.push(`/page/account/checkout`);
        }
        // getProducts();
        getProductsToFilter("/api/bff-store/products");
      } catch (error) {
        if(error?.response?.status == 401){
          localStorage.clear();
          toast.error("Antes debe ingresar..");
          router.push("/page/account/login")
        }else{
          toast.error(error.response?.data.message || error.message);
        }
      }
      setBotonState(false);
    }

    const removeProductFromCart = async (code) => {
      setBotonState(true);
      setOrder(null);
      try {
       const {data} = await axios.delete(`/api/bff-store/private/carts/products/${code}`)
        console.log(data);
        toast.error("Producto quitado del carrito");
        setCart((prevCart) => ({
          ...prevCart,
          products: prevCart.products.filter(product => product.code !== code)
        }));
        // getProducts();
        getProductsToFilter("/api/bff-store/products");
      } catch (error) {
        if(error?.response?.status == 401){
          console.log(error);
          localStorage.clear();
          setAuthenticated(false);
          toast.error("Antes debe ingresar..");
          router.push("/page/account/login")
        }else{
          toast.error(error.response?.data.message || error.message);
        }
      }
      setBotonState(false);
    };

    const removeProductsFromCart = async () => {
      try {

        for(const product of cart.products){
           await axios.delete(`/api/bff-store/private/carts/products/${product.code}`)
        }

        setCart((prevCart) => ({
          ...prevCart,
          products: []
        }));

        toast.error("Su tiempo de compra ha terminado..");
        
        // getProducts();
        getProductsToFilter("/api/bff-store/products");
      } catch (error) {
        if(error?.response?.status == 401){
          localStorage.clear();
          setAuthenticated(false);
          toast.error("Antes debe ingresar..");
          router.push("/page/account/login")
        }else{
          toast.error(error.response?.data.message || error.message);
        }
      }
    };

    const checkout = async (values)=>{
      setBotonState(true);
      try {
        console.log(values);
        const checkoutObj = {
          cart: cart.code,
          email: values.email,
          shipping_method: values. shipping_method,
          address_street: null,
          address_number: null,
          address_extra: null,
          address_city: null,
          address_state: null,
          address_zipcode: null
        }
        const { data } = await axios.post("/api/bff-store/private/carts/checkout", checkoutObj);
        setOrder(data);
        toast.success("Gracias por su compra!")

      } catch (error) {
        if(error?.response?.status == 401){
          localStorage.clear();
          setAuthenticated(false);
          toast.error("Error de autenticación. Ingrese nuevamente");
          router.push("/page/account/login")
        }else{
          toast.error(error.response?.data.message || error.message);
        }
        // logout();
        // toast.error(error.response?.data.message || error.message);
        // console.log(error.response.status);
      }
      setBotonState(false);
    }

    const recoveryPassword = async (values) =>{
      setBotonState(true);
      try {
          const { data } = await axios.post("/api/bff-store/auth/password/reset",values);
          toast.success("Contraseña modificada con éxito")
          router.push("/page/account/login")
      } catch (error) {
          toast.error(error.message);
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
        register,
        products,
        setProducts,
        categories,
        loadingCategories,
        cart,
        setCart,
        order,
        addProductToCart,
        removeProductFromCart,
        removeProductsFromCart,
        checkout,
        comprarAgregarProducto,
        flagTimer,
        recoveryPassword,
        setCategory
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
