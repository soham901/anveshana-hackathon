import { apiURL } from "@/app/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export const useAuth = () => {

    const [user, setUser] = useState<any>({});
    const [token, setToken] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingProfile, setIsLoadingProfile] = useState(true);

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
            setIsLoadingProfile(true);

            // Make API request to fetch profile
            const res = await fetch(`${apiURL}/profile/`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            // Check for a successful response
            if (!res.ok) {
                throw new Error(`Failed to fetch profile: ${res.status}`);
            }

            // Parse the response data
            const data = await res.json();

            console.log("DATA", data);


            if (data && data.results && data.results.length > 0) {
                // Set the user state with fetched data
                setUser(data.results[0]);
            } else {
                throw new Error("No profile data returned from the API");
            }

            setIsLoadingProfile(false);
        } catch (error) {
            console.error("Error fetching profile:", error);
            setIsLoadingProfile(false);
            alert("There was an issue fetching the profile. Please try again.");
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
        isLoadingProfile,
        token,
        user,
        fetchProfile,
        logout,
    };
}