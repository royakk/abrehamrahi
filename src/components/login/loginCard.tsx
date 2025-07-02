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
import { CaptchDialog } from "./captchDialog";
import { MenoLogin } from "./menu";
const LoginFlow = () => {
  const { step, showCaptch } = useLoginContext();

  return (
    <div>
      <Card className="w-[488px] shadow-none   px-[59px] py-8">
        <CardHeader className="rtl mb-5 p-0">
          <div style={{ display: "flex", gap: "8px" }}>
            <img src="./Group.png" alt="Group" />
            <img src="./abr.png" alt="ABR" />
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {step === "number" && <NumberPart />}
          {step === "password" && <PasswordPart />}
          {step === "otp" && <OtpCode />}
        </CardContent>
        <div className=" flex justify-center  lg:hidden">
          <CardFooter>
            <MenoLogin sm />
          </CardFooter>
        </div>
        {showCaptch && <CaptchDialog />}
      </Card>
    </div>
  );
};
export const LoginCard = () => (
  <LoginProvider>
    <LoginFlow />
  </LoginProvider>
);
