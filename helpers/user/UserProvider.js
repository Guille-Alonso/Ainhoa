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
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);
    const [is_new, setIsnew] = useState(null);
    const [special_price, setSpecialPrice] = useState(null);
    const [attribute, setAttribute] = useState(null);

    const [products, setProducts] = useState([])
    const [flagSearch, setFlagSearch] = useState(false); // PARA MANEJAR LAS PETICIONES CON EL BUSCADOR
    const [flagCategory, setFlagCategory] = useState(false); // PARA MANEJAR LA APERTURA O CIERRE DEL FILTRO DE SUBCATEG.

    const [categories,loadingCategories] = useGet("/api/bff-store/categories",axios)

    const router = useRouter();

    const [flagEmptyProducts, setFlagEmptyProducts] = useState(false); // PARA MENSAJE DE "No hay productos para su selección.."

    const [flagCatFilter, setflagCatFilter] = useState(true); // PARA DARLE UN SOLO SENTIDO AL FILTRO (PRIMER CATEG. DESP LOS DEMAS)

    const getProductsToFilter = async (url)=>{
      setBotonState(true)
      setFlagEmptyProducts(false);
      try {
        const {data} = await axios.get(url)
        if(data.length == 0){
          toast.error("No se encontraron productos..");
          setFlagEmptyProducts(true);
          setProducts([]);
        }else{
          setProducts(data);
        }
      } catch (error) {
        //TODO capture error
      }
      setflagCatFilter(true);
      setBotonState(false)
    }

    
    useEffect(() => {
     
      let apiUrl = "/api/bff-store/products";
      let queryParams = [];

      const filters = {  size, page, is_new, special_price,attribute,category_id };

      for (const filter in filters) {
       
        if (filters[filter] !== null && filters[filter] !== undefined && filters[filter] !== -1) {
            queryParams.push(`${filter}=${filters[filter]}`);
        }
    }

      if (queryParams.length > 0) {
        apiUrl += '?' + queryParams.join('&');
      }

        getProductsToFilter(apiUrl);
   
  }, [ size, page, is_new, special_price, attribute]); 


  useEffect(() => {
    let apiUrl = "/api/bff-store/products";
    if((special_price != null || is_new != null || attribute != null) || category_id == null){
      setflagCatFilter(false);
      getProductsToFilter(apiUrl);
    }else if(flagSearch == false){
      getProductsToFilter(`/api/bff-store/products?category_id=${category_id}`);
    }
  }, [category_id])


    const login = async (values) => {
      setBotonState(true);
      try {
        const { data } = await axios.post("/api/bff-store/auth/login", values);
        router.push("/")
        setAuthenticated(!!data.user);
        setUser(data.user);
        setCart(data.cart)
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.access_token;
        localStorage.setItem("token", data.access_token);

      } catch (error) {
        toast.error(error.response?.data.message || error.message);
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
      }
      setLoading(false);
    };

    const logout = async () =>{
      try {

      if(cart?.products.length > 0){
        
       await removeProductsFromCart()
      }

      router.push("/page/account/login");
      setAuthenticated(false);
      localStorage.clear();
      setOrder(null);
      
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
      }
    }

    const register = async (values) =>{
      setBotonState(true);
      try {
        const { data } = await axios.post("/api/bff-store/customers/register", values);
        toast.success("Usuario registrado !")
        router.push("/page/account/login")
      } catch (error) {
        toast.error(error.response?.data.message || error.message);
      }
      setBotonState(false);
    }

    const contact = async (values)=>{
      setBotonState(true);
      try {
        await axios.post("/api/bff-store/contact",values)
        toast.success("Gracias por contactarnos!!!")
        router.push("/")
       } catch (error) {
        toast.error(error.response?.data.message || error.message);
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
        toast.error("Producto quitado del carrito");
        setCart((prevCart) => ({
          ...prevCart,
          products: prevCart.products.filter(product => product.code !== code)
        }));
    
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
        const checkoutObj = {
          cart: cart.code,
          email: values.email,
          shipping_method: values.shipping_method,
          address_street: values.address,
          address_number: null,
          address_extra: null,
          address_city: values.city,
          address_state: values.state,
          address_zipcode: values.pincode
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
        setCategory,
        getProductsToFilter,
        contact,
        flagSearch,
        setFlagSearch,
        category_id,
        flagCategory,
        setFlagCategory,
        page,
        setPage,
        size,
        setSize,
        is_new,
        setIsnew,
        special_price,
        setSpecialPrice,
        attribute,
        setAttribute,
        flagEmptyProducts,
        flagCatFilter,
        setflagCatFilter
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
