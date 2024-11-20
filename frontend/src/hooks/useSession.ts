import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/utils/api";

interface User {
  name: string;
  email: string;
  department: string;
  role: string;
  googleId: string | null;
  profilePicture: string | null;
  [key: string]: any; 
}

const useSession = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [reload, setReload] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get("/api/auth/user", { withCredentials: true });
        if (response?.data?.data) {
          setUser(response.data.data);
          setLoggedIn(true);
        } else {
          setUser(null);
          setLoggedIn(false);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        setUser(null);
        setLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
    console.log("Fetching user...",user);
  }, [reload]);

  const logout = async () => {
    try {
      await api.get("/api/auth/logout", { withCredentials: true });
      setUser(null);
      setLoggedIn(false);
      navigate("/auth/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return { user, loading, loggedIn, logout ,reload ,setReload };
};

export default useSession;
