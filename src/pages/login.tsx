import { LoginImage } from "@/components/login/image";
import { LoginCard } from "@/components/login/loginCard";
import { MenoLogin } from "@/components/login/menu";

export const Login = () => {
  return (
    <div className="grid grid-cols-5 gap-40  justify-center items-center">
      <div className="col-span-3">
        <LoginImage />
        <MenoLogin />
      </div>
      <div className="col-span-2">
        <LoginCard />
      </div>
    </div>
  );
};
