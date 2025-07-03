import {create} from 'zustand'

interface User {
    _id: string;
    name: string;
    email: string;
}

interface AuthState {
    User: User | null;
    loading: boolean;
    setLoading: (loading: boolean) => void;
    setUser: (user : User) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    User: null,
    loading: true,
    setLoading: (loading) => set({ loading }),
    setUser: (user) => set({ User: user }),
    logout: () => set({ User: null }),
}));