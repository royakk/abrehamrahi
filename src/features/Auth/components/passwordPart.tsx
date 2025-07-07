import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useForm, Controller } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { useLoginContext, type User } from "@/lib/loginContext";
import { useNavigate } from "react-router-dom";
import { authService } from "../services";
import useLoginStore from "@/zustand/useLoginForms";
import { authToken } from "@/lib/storage";
import { PATH } from "@/lib/path";
import { captchaTime } from "../storage";
import type { LoginReq } from "../types";
import { CaptchDialog } from "./captchDialog";
import useAuthStore from "@/zustand/useAuthStore";

export const PasswordPart = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { goToStep, setShowCaptcha, showCaptch } = useLoginContext();
  const { loginForms, setLoginForms } = useLoginStore();
  const { setUser } = useAuthStore();

  const { control, handleSubmit, setError } = useForm<LoginReq>({
    defaultValues: {
      country: "IR",
      password: "",
    },
  });
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<LoginReq> = async (values) => {
    const rawCaptcha = captchaTime.get();
    const captchaInLocalStorage = rawCaptcha ? JSON.parse(rawCaptcha) : null;

    if (
      captchaInLocalStorage &&
      captchaInLocalStorage.captcha_required &&
      Number(captchaInLocalStorage.captcha_required) * 1000 > Date.now()
    ) {
      setShowCaptcha(true);
    } else {
      const {
        data,
        status,
        errors: loginError,
      } = await authService.login({
        ...loginForms,
        ...values,
      });
      if (data) {
        authToken.set({
          access: data?.access!,
          refresh: data?.refresh!,
        });
        const profileRes = await authService.getProfile();
        if (profileRes) {
          setUser(profileRes.data);
        }
        navigate(PATH.profile);
      } else if (loginError.captcha_required !== null) {
        setError("password", {
          message: loginError.detail,
        });
        captchaTime.set(JSON.stringify(loginError));
      } else {
        setError("password", {
          message: loginError.detail,
        });
      }
    }
  };

  return (
    <div className="rtl">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => goToStep("number")}
            className="  text-gray-500 cursor-pointer"
            tabIndex={-1}
          >
            <img src="./arrow-left.png" />
          </button>
          <h1 className="flex rtl text-[22px] font-bold text-newblack800 ">
            ورود به حساب کاربری
          </h1>
        </div>
        <h2 className="flex rtl text-[14px] font-bold text-newblack500 mb-11">
          برای ورود لطفا شماره موبایل خط همراه اول خود را وارد کنید.
        </h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid w-full rtl ">
          <Controller
            name="password"
            control={control}
            rules={{
              required: "رمز عبور الزامی است",
            }}
            render={({ field, fieldState }) => (
              <>
                <Label htmlFor="password" className="mb-3">
                  رمز عبور
                </Label>
                <div className="relative">
                  <Input
                    {...field}
                    id="password"
                    type={showPassword ? "text" : "password"}
                    className={`ltr pr-10 `}
                    error={fieldState.error?.message}
                  />
                </div>
              </>
            )}
          />

          <Button type="submit" className="mt-8 bg-primaryMain h-[48px]">
            ادامه
          </Button>
        </div>
      </form>
      <div className="flex flex-col ">
        <div className="flex my-4 items-center gap-1">
          <img src="./sms.png" />
          <p
            onClick={() => goToStep("otp")}
            className="text-primaryMain text-[14px] cursor-pointer"
          >
            ورود با رمز یک بار مصرف
          </p>
        </div>
        <div className="flex items-center gap-1">
          <img src="./unlock.png" />
          <p className="text-primaryMain text-[14px] cursor-pointer">
            بازیابی رمز عبور{" "}
          </p>
        </div>
      </div>
      {showCaptch && <CaptchDialog onSubmit={handleSubmit(onSubmit)} />}
    </div>
  );
};
