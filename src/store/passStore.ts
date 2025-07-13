import {create} from 'zustand'

export interface Pass {
    _id: string;
    url: string;
    username: string;
    pass:string;
    IV: string;
    userId: string;
}

interface PassStore {
    passes: Pass[];
    loading: boolean;
    setPasses: (passes: Pass[]) => void;
    setLoading: (loading: boolean) => void;
    addPass: (pass: Pass) => void;
    removePass: (id: string) => void;
    updatePass: (id: string, updatedPass: Partial<Pass>) => void;
}

export const usePassStore = create<PassStore>((set) => ({
    passes: [],
    loading: true,
    setPasses: (passes) => set({ passes }),
    setLoading : (loading) => set({loading}),
    addPass: (pass) => set((state) => ({
        passes: [...state.passes,pass]
    })),
    removePass: (id) => set((state) => ({
        passes: state.passes.filter((pass) => pass._id !== id) 
    })),
    updatePass: (id, updatedPass) => set((state) => ({
        passes: state.passes.map((pass) =>
            pass._id === id && pass.url === updatedPass.url ? {...pass, ...updatedPass} : pass
        )
    }))
}))
