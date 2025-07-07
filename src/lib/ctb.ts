import axios from "axios";
import { useAuthStore } from "@/store/authStore";
import { usePassStore } from "@/store/passStore";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL


// call to backend for users
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
      `${API_BASE_URL}/users/signup`,
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
      `${API_BASE_URL}/users/signin`,
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
    await axios.post(`${API_BASE_URL}/users/logout`,
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
      const res = await axios.get(`${API_BASE_URL}/users/me`,{
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


// call to backend for passwords
type passProps = {
    url: string;
    username: string;
    pass:string;
    IV: string;
}

export const getAllPasses = async () => {
  const {setPasses} = usePassStore.getState()
  try {
    const res = await axios.get(`${API_BASE_URL}/passes/get-passes`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    })

    const passes = res.data.passes;
    setPasses(passes)
  } catch (error) {
    console.log("error while fetching passes", error);
    throw new Error("Failed to fetch passes");
  }
}

export const addPass = async ({url,username,pass,IV} : passProps) => {
  const {addPass} = usePassStore.getState()
  try {
    const res = await axios.post(`${API_BASE_URL}/passes/add-pass`, 
      {
        url,username,pass,IV
      },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json"
        }
      }
    )

    console.log(`Pass added successfully`);
    const newPass = res.data.newPass;
    addPass(newPass)
    return res.data.newPass; // Return the newly added pass
  } catch (error) {
    console.log("error while adding pass", error);
    throw new Error("Failed to add pass");
  }
}

export const removePass = async (id: string) => {
  const {removePass} = usePassStore.getState()
  try {
    const res = await axios.delete(`${API_BASE_URL}/passes/delete-pass/${id}`,
      {
        withCredentials: true, 
        headers: {
          "Content-Type": "application/json"
        }
      },
    )
    console.log("pass deleted succesfully")
    removePass(id); // Update the store after deletion
    return res.data.deletedPass;
  } catch (error) {
    console.log("error while deleting pass", error);
    throw new Error("Failed to delete pass");
  }
}

export const updatePass = async ({url,username,pass,IV,id}: passProps & {id: string}) => {
  const {updatePass} = usePassStore.getState()
  try {
    const res = await axios.post(`${API_BASE_URL}/passes/update-pass/${id}`,
      {
        url,username,pass,IV
      },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
    console.log("pass updated successfully");
    const updatedPass = res.data.updatedPass
    updatePass(id,updatedPass)
    return res.data.updatedPass
  } catch (error) {
    console.log("error while updating pass", error);
    throw new Error("Failed to update pass");
  }
}
