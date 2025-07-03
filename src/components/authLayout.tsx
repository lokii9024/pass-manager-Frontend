import { useAuthStore } from "@/store/authStore";
import { Navigate } from "react-router-dom";

type AuthLayoutProps = {
    children: React.ReactNode;
}

export default function AuthLayout({children} : AuthLayoutProps){
    const { User,loading } = useAuthStore();

    if(loading){
        return <div className="text-center mt-20 text-lg">Loading...</div>;
    }

    if(!User && !loading){
        return <Navigate to="/signin" replace />
    }

    return children;
}