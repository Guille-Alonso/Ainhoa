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
        <p className={seconds < 60 ? "text-danger" : ""}>{formatTime(seconds)}</p>
      </div>
    );
  };

  export default Timer;