import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { http } from "@/services/http";
import { useLoginContext, type User } from "@/lib/loginContext";
import { generateCode } from "@/services/login";
import { isPast } from "@/lib/utils";
export type GenerateCode = {
  phone: string;
  request_type: number;
  prefix: string;
  captcha_value: string;
  captcha_proivider: string;
  captcha_id: string;
};
export const NumberPart = () => {
  const { step, setUser, setShowCaptcha, goToStep } = useLoginContext();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<GenerateCode>({
    defaultValues: {
      phone: "",
      prefix: "+98",
    },
  });

  const onSubmit: SubmitHandler<GenerateCode> = async (data) => {
    const phone = data.phone.startsWith("0") ? data.phone.slice(1) : data.phone;
    // if (isPast()) {
    //   setShowCaptcha(true);
    // } else {
    setUser((prevUser: User) => ({
      ...prevUser,
      phone: phone,
    }));
    try {
      const res = await generateCode({
        ...data,
        phone: phone,
      });

      if (res.captcha_required !== null) {
        setShowCaptcha(true);
        window.localStorage.setItem("captchaTime", res.captcha_required);
      } else {
        goToStep("otp");
      }
    } catch (error: any) {
      const { captcha_required } = error.response.data;
      if (captcha_required !== null) {
        setShowCaptcha(true);
      }
    }
    // }
  };
  return (
    <div>
      <h1 className="flex rtl text-[22px] font-bold text-newblack800 mb-4">
        ورود به حساب کاربری
      </h1>
      <h2 className="flex rtl text-[14px] font-bold text-newblack500 mb-10">
        برای ورود لطفا شماره موبایل خط همراه اول خود را وارد کنید.
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="phone"
          control={control}
          render={({ field, fieldState }) => (
            <div className="grid w-full rtl ">
              <Label htmlFor="phone" className="mb-3">
                شماره موبایل
              </Label>
              <Input
                {...field}
                {...fieldState}
                className="rtl bg-newblack200"
                type="text"
                id="phone"
                placeholder="*** *** **09"
              />
              {fieldState.error && (
                <span className="text-red-500 text-sm">
                  {fieldState.error.message}
                </span>
              )}
              <Button className="mt-10 bg-primaryMain h-[48px] ">ورود</Button>
            </div>
          )}
        />
      </form>
    </div>
  );
};
