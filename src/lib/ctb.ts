import axios from "axios";
import { useAuthStore } from "@/store/authStore";

type signUpProps = {
  name: string;
  email: string;
  password: string;
};

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
