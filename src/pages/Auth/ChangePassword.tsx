import { NewPassword } from "@/features/Auth/components/Register/NewPassword";
import { LoginImage } from "@/features/Auth/components/shared/image";
import { MenoLogin } from "@/features/Auth/components/shared/menu";

export const ChangePasswordPage = () => {
  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="container grid w-full grid-cols-1 lg:grid-cols-2 items-center !p-0 lg:gap-16 max-w-5xl">
          <div className="hidden lg:flex  lg:flex-col  ">
            <LoginImage />
            <MenoLogin />
          </div>
          <div className="flex justify-center w-full">
            <NewPassword />
          </div>
        </div>
      </div>
    </div>
  );
};
