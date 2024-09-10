import { apiURL } from "@/app/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export const useAuth = () => {

    const [user, setUser] = useState<any>({});
    const [token, setToken] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!token) {
            AsyncStorage.getItem("token").then((token) => {
                setToken(token || "");
                setIsLoading(false);
            });
        } else {
            setIsLoading(false);
        }
    }, []);

    const fetchProfile = async () => {
        try {
            console.log("STARTED");

            const res = await fetch(`${apiURL}/profile/`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            const data = await res.json();
            console.log(data);
            return data;

        } catch (error) {
            console.log({ authtoken: token });

            console.log(error);

        }
    };
    const logout = async () => {
        try {
            await AsyncStorage.removeItem("token");
            setToken("");
        } catch (error) {
            console.error("Failed to remove token:", error);
        }

    };

    return {
        isLoading,
        token,
        user,
        fetchProfile,
        logout,
    };
}