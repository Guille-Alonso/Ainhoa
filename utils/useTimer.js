import { useContext } from "react";
import TimerContext from "../helpers/timer/timerContext";

export const useTimer = () => {
    const { seconds } = useContext(TimerContext);
    return { seconds };
  }