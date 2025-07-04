import { LoginImage } from "@/features/Auth/components/Login/image";
import { LoginCard } from "@/features/Auth/components/Login/loginCard";
import { MenoLogin } from "@/features/Auth/components/Login/menu";

export const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="container grid w-full grid-cols-1 lg:grid-cols-2 items-center !p-0 lg:gap-16 max-w-5xl">
        <div className="hidden lg:flex  lg:flex-col  ">
          <LoginImage />
          <MenoLogin />
        </div>
        <div className="flex justify-center w-full">
          <LoginCard />
        </div>
      </div>
    </div>
  );
};
