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
import { NewPassword } from "./NewPassword";

const RegisterFlowComponent = () => {
  const { step } = useLoginContext();

  return (
    <div>
      <Card className="w-[376px] sm:w-[488px] shadow-none px-4 md:px-[59px] py-8">
        <CardHeader className="rtl mb-8 !p-0">
          <div style={{ display: "flex", gap: 8 }}>
            <img src="./Group.png" alt="Group" />
            <img src="./abr.png" alt="ABR" />
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {step === "number" && <CreateAcount />}
          {step === "otp" && <OtpCode />}
        </CardContent>
        <div className="flex justify-center lg:hidden">
          <CardFooter>
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
