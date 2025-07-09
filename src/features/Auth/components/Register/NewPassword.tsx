import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import { MenoLogin } from "../shared/menu";
import { Password } from "./Password";
import { AbrLogo } from "@/components/ui/AbrLogo";
export const NewPassword = () => {
  return (
    <div>
      <Card className="w-[376px] sm:w-[488px] shadow-none px-4 md:px-[59px] py-8">
        <CardHeader className="rtl mb-8 !p-0">
          <AbrLogo />
        </CardHeader>
        <CardContent className="p-0">
          <Password />
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
