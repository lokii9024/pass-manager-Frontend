import { usePassStore } from "@/store/passStore";

type PassLayoutProps = {
  children: React.ReactNode;
};

export default function PassLayout({ children }: PassLayoutProps) {
  const loading = usePassStore((state) => state.loading); // ✅ reactive

  if (loading) {
    return <div className="text-center mt-20 text-lg">Fetching entries...</div>;
  }

  return <>{children}</>; // ✅ fallback after loading
}
