import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { useLoginContext } from "@/lib/loginContext";
import type { GenerateOtpReq } from "../types";
import { captchaTime } from "../storage";
import { authService } from "../services";
import useLoginStore from "@/zustand/useLoginForms";
import { CaptchDialog } from "./captchDialog";

export const NumberPart = () => {
  const { setShowCaptcha, goToStep, showCaptch } = useLoginContext();
  const { setLoginForms, loginForms } = useLoginStore();

  const { control, handleSubmit } = useForm<GenerateOtpReq>({
    defaultValues: {
      phone: "",
      prefix: "+98",
    },
  });

  const onSubmit: SubmitHandler<GenerateOtpReq> = async (values) => {
    const editedPhone =
      values?.phone && values?.phone.startsWith("0")
        ? values?.phone.slice(1)
        : values.phone;
    setLoginForms({ phone: editedPhone });
    const captchaInLocalStorage = captchaTime.get();
console.log("captchaInLocalStorage", captchaInLocalStorage);

if (
  captchaInLocalStorage &&
  captchaInLocalStorage.captcha_required &&
  captchaInLocalStorage.captcha_required * 1000 > Date.now()
) {
  setShowCaptcha(true);
} else {
  captchaTime.remove();

  const {
    data,
    status,
    errors: otpErrors,
  } = await authService.generateOtp({
    ...values,
    ...loginForms,
    phone: editedPhone,
  });

  if (data?.captcha_required === null && !otpErrors) {
    goToStep("otp");
  } else if (data?.captcha_required !== null) {
    captchaTime.set(otpErrors);
    setShowCaptcha(true);
  }
}
  };
  return (
    <div>
      <p className="flex rtl text-[22px] font-bold text-newblack800 mb-4">
        ورود به حساب کاربری
      </p>
      <h2 className="flex rtl text-[14px] font-bold text-newblack500 mb-10">
        برای ورود لطفا شماره موبایل خط همراه اول خود را وارد کنید.
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="phone"
          control={control}
          rules={{
            required: "شماره موبایل الزامی است",
          }}
          render={({ field, fieldState }) => (
            <div className="grid w-full rtl ">
              <Label htmlFor="phone" className="mb-1">
                شماره موبایل
              </Label>
              <Input
                {...field}
                className={`ltr bg-newblack200
              `}
                type="text"
                id="phone"
                placeholder="09** *** ***"
                error={fieldState.error?.message}
              />

              <Button className="mt-8 bg-primaryMain h-[48px] ">ورود</Button>
            </div>
          )}
        />
      </form>
      {showCaptch && <CaptchDialog onSubmit={handleSubmit(onSubmit)} />}
    </div>
  );
};
