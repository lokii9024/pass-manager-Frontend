import { useAuthStore } from "@/store/authStore";
import { Navigate } from "react-router-dom";

type AuthLayoutProps = {
    children: React.ReactNode;
}

export default function AuthLayout({children} : AuthLayoutProps){
    const { User } = useAuthStore();

    if(!User){
        return <Navigate to="/signin" replace />
    }

    return children;
}