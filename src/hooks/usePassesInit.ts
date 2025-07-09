import { getAllPasses } from "@/lib/ctb";
import { usePassStore } from "@/store/passStore";
import { useEffect } from "react";
 
export const usePassesInit = () =>{
    const setLoading = usePassStore((state) => state.setLoading);
    const setPasses = usePassStore((state) => state.setPasses);

    useEffect( () => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const passes = await getAllPasses()
                setPasses(passes)
            } catch (error) {
                console.error("usePassesInit failed:", error);
            }finally{
                setLoading(false)
            }
        }

        fetchData()
    },[setLoading,setPasses] )
}