import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { LoginProvider, useLoginContext } from "@/lib/loginContext";
import { MenoLogin } from "../shared/menu";
import { OtpCode } from "../Login/OtpCode";
import { CreateAcount } from "./CreateAcount";
import { AbrLogo } from "@/components/ui/AbrLogo";

const RegisterFlowComponent = () => {
  const { step } = useLoginContext();

  return (
    <div>
      <Card className="w-[376px] sm:w-[488px] shadow-none px-4 md:px-[59px] py-8">
        <CardHeader className="rtl mb-8 !p-0">
          <AbrLogo />
        </CardHeader>

        <CardContent className="p-0">
          {step === "number" && <CreateAcount />}
          {step === "otp" && <OtpCode isRegister />}
        </CardContent>
        <div className="flex justify-center lg:hidden">
          <CardFooter className="mt-10">
            <MenoLogin sm />
          </CardFooter>
        </div>
      </Card>
    </div>
  );
};

export const RegisterFlow = () => (
  <LoginProvider>
    <RegisterFlowComponent />
  </LoginProvider>
);
