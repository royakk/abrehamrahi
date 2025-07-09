import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { NumberPart } from "./numberPart";
import { PasswordPart } from "./passwordPart";
import { OtpCode } from "./OtpCode";
import { LoginProvider, useLoginContext } from "@/lib/loginContext";
import { MenoLogin } from "../shared/menu";
import { AbrLogo } from "@/components/ui/AbrLogo";
const LoginFlow = () => {
  const { step } = useLoginContext();

  return (
    <div>
      <Card className="w-[376px] sm:w-[488px] shadow-none px-4  md:px-[59px] py-8">
        <CardHeader className="rtl mb-8 !p-0">
          <AbrLogo />
        </CardHeader>

        <CardContent className="p-0 ">
          {step === "number" && <NumberPart />}
          {step === "password" && <PasswordPart />}
          {step === "otp" && <OtpCode />}
        </CardContent>
        <div className=" flex justify-center  lg:hidden">
          <CardFooter>
            <MenoLogin sm />
          </CardFooter>
        </div>
      </Card>
    </div>
  );
};
export const LoginCard = () => (
  <LoginProvider>
    <LoginFlow />
  </LoginProvider>
);
