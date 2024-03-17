import { useEffect, useState } from "react";

export const useImageSize = () => {
  const [imageSize, setImageSize] = useState({ width: "", height: "" });
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Limpia el event listener cuando el componente se desmonta
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (windowWidth >= 1000) {
      // setImageSize({
      //   width: "100vw",
      //   height: "50vh",
      // });
      setImageSize({
        width: "322px",
        height: "438px",
      });
    } else if (windowWidth >= 800 && windowWidth < 1000) {
      setImageSize({
        width: "80%",
        height: "40vh",
      });
    } else if (windowWidth >= 600 && windowWidth < 800) {
      setImageSize({
        width: "80%",
        height: "30vh",
      });
    } else if (windowWidth < 600) {
      // setImageSize({
      //   width: "80vw",
      //   height: "42vh",
      // });
      setImageSize({
        width: "177px",
        height: "241px",
      });
    }
  }, [windowWidth]);

  return imageSize;
};
