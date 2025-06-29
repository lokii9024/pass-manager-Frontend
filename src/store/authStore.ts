import {create} from 'zustand'

interface User {
    _id: string;
    name: string;
    email: string;
}

interface AuthState {
    User: User | null;
    setUser: (user : User) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    User: null,
    setUser: (user) => set({ User: user }),
    logout: () => set({ User: null }),
}));