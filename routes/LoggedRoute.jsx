import { useEffect } from "react";
import { useRouter } from "next/router";

const LoggedRoute = ({ children }) => {
    const router = useRouter();

    useEffect(() => {
        if(localStorage.getItem("token")){
            router.push("/")
        }
    }, [])

    return !localStorage.getItem("token") ? children : null;
}

export default LoggedRoute;

