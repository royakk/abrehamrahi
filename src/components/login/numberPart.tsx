import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export const NumberPart = () => {
  return (
    <div>
      <h1 className="flex rtl text-[22px] font-bold text-newblack800 mb-4">
        ورود به حساب کاربری
      </h1>
      <h2 className="flex rtl text-[14px] font-bold text-newblack500 mb-10">
        برای ورود لطفا شماره موبایل خط همراه اول خود را وارد کنید.
      </h2>
      <div className="grid w-full rtl gap-4">
        <Label htmlFor="mobile" className="mb-1">
          شماره موبایل
        </Label>
        <Input
          className="rtl bg-newblack200"
          type="text"
          id="mobile"
          placeholder=" *** *** **09"
        />
        <Button className="mt-4 bg-primaryMain h-[48px]">ورود</Button>
      </div>
    </div>
  );
};
