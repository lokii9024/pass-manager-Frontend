import axios from "axios";
import { useAuthStore } from "@/store/authStore";

type signUpProps = {
  name: string;
  email: string;
  password: string;
};

type signInProps = {
  email : string,
  password: string
}

export const signUpUser = async ({ name, email, password }: signUpProps) => {
  const { setUser } = useAuthStore.getState(); // ✅ getState for non-hook context

  try {
    const res = await axios.post(
      "http://localhost:8000/api/v1/users/signup",
      { name, email, password },
      {
        withCredentials: true, // ✅ sends HttpOnly cookie
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const user = res.data.user;
    setUser(user);
    return user;

  } catch (error: any) {
    const message = error.response?.data?.message || "Signup failed";
    throw new Error(message);
  }
};

export const signInUser = async ({email, password} : signInProps) => {
  const { setUser } = useAuthStore.getState(); // ✅ getState for non-hook context

  try {
    const res = await axios.post(
      "http://localhost:8000/api/v1/users/signin",
      { email, password },
      {
        withCredentials: true, // ✅ sends HttpOnly cookie
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const user = res.data.ruser;
    setUser(user);
    return user;

  } catch (error: any) {
    const message = error.response?.data?.message || "Signin failed";
    throw new Error(message);
  }
}

export const logOutUser = async () => {
  const {logout} = useAuthStore.getState(); // ✅ getState for non-hook context

  try {
    await axios.post("http://localhost:8000/api/v1/users/logout",
      {}, //empty body
      {
      withCredentials: true, // ✅ sends HttpOnly cookie
      headers: {
        "Content-Type": "application/json",
      },
    });
    logout(); // Clear user state in store
    return true; // Indicate successful logout
  } catch (error) {
    console.error("Logout failed:", error);
    throw new Error("Logout failed");
  }
};

export const getCurrentUser = async () => {
    const {setUser,logout,setLoading} = useAuthStore.getState()
    try {
      const res = await axios.get("http://localhost:8000/api/v1/users/me",{
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        }
      })

      const user = res.data.user

      setUser(user)
    } catch (error:any) {
      if (error.response?.status === 401) {
        logout();
        console.warn("Session expired");
      } else {
        console.error("Error fetching user:", error);
      }
    }finally{
      setLoading(false)
    }
}
