import { useContext, useEffect, useState } from "react";
import TimerContext from "./timerContext";
import UserContext from "../user/UserContext";


const TimerProvider = ({ children }) => {

  const [flag, setFlag] = useState(true)
  const [seconds, setSeconds] = useState(0);
  const userContext = useContext(UserContext);

    function getClockTime (){
      const startDate = new Date(userContext.cart?.created_at).getTime();
      const endDate = new Date(userContext.cart?.due_date).getTime();

      const differenceInSeconds = Math.floor((endDate - startDate) / 1000);
      return differenceInSeconds;
    }
    
    useEffect(() => {
        setSeconds(getClockTime());
     
    }, [userContext.flagTimer,userContext.cart])
    

    useEffect(() => {
        if (userContext.cart?.products.length > 0 && flag && seconds != 0) {

          const intervalId = setInterval(() => {
            setSeconds((prevSeconds) => prevSeconds - 1);
          }, 1000);
      
          return () => {
            clearInterval(intervalId);
          };
        } else  {
          setSeconds(getClockTime()); // Reiniciar el temporizador
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