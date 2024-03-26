import { useTimer } from "./useTimer";

const Timer = () => {
    const { seconds } = useTimer();

    const formatTime = (time) => {
      const minutes = Math.floor(time / 60);
      const remainingSeconds = time % 60;
      return `${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };
  
    return (
      <div>
        <p className={seconds < 60 ? "mt-3 text-danger" : "mt-3 text-black"}>{formatTime(seconds)}</p>
      </div>
    );
  };

  export default Timer;