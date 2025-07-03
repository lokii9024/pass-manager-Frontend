import { getCurrentUser } from "@/lib/ctb"
import { useEffect } from "react"
import { useAuthStore } from "@/store/authStore"

export const useAuthInit =  () => {
    const {setLoading} = useAuthStore.getState()
    useEffect( () => {
        setLoading(true)
        getCurrentUser()
    },[])
}