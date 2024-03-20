import { useContext, useEffect, useState } from "react";
import TimerContext from "./timerContext";
import UserContext from "../user/UserContext";


const TimerProvider = ({ children }) => {
    const [seconds, setSeconds] = useState(1000);
    const [flag, setFlag] = useState(true)
    const userContext = useContext(UserContext);
  
    useEffect(() => {
        if (userContext.cart?.products.length > 0 && flag) {
          const intervalId = setInterval(() => {
            setSeconds((prevSeconds) => prevSeconds - 1);
          }, 1000);
      
          return () => {
            clearInterval(intervalId);
          };
        } else {
          setSeconds(1000); // Reiniciar el temporizador a 300 segundos
        }
      }, [userContext.cart]);
      

    useEffect(() => {
      if (seconds == 0 && flag && userContext.cart?.products.length > 0) {
        setFlag(false);
        userContext.removeProductsFromCart();
        setFlag(true);
      }
    }, [seconds]);
  
    return (
      <TimerContext.Provider value={{ seconds }}>
        {children}
      </TimerContext.Provider>
    );
  };

  export default TimerProvider;