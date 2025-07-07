import { cn } from "@/lib/utils";

const Loading = ({ className = "" }) => {
  return (
    <div
      className={cn(
        "w-full h-screen flex items-center justify-center",
        className
      )}
    >
      <h1 className="font-bold text-3xl">Loading.......</h1>
    </div>
  );
};

export default Loading;
