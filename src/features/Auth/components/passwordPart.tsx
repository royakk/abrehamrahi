import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { useLoginContext, type User } from "@/lib/loginContext";
import { useNavigate } from "react-router-dom";
import { authService } from "../services";
import useLoginStore from "@/zustand/useLoginForms";
import { authToken } from "@/lib/storage";
import { getProfile } from "@/hooks/usecheckLogin";
import { PATH } from "@/lib/path";
import { captchaTime } from "../storage";

type PasswordRequest = {
  country: string;
  password: string;
  phone: string;
  prefix: string;
};

export const PasswordPart = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { goToStep, setUser, user, setShowCaptcha } = useLoginContext();
  const { loginForms, setLoginForms } = useLoginStore();

  const { control, handleSubmit, setError } = useForm<PasswordRequest>({
    defaultValues: {
      country: "IR",
      password: "",
      phone: "",
      prefix: "+98",
    },
  });
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<PasswordRequest> = async (values) => {
    // setUser((prevUser: User) => ({
    //   ...prevUser,
    //   password: data.password,
    // }));
    // try {
    //   const loginRes = await login({ ...data, phone: user.phone });
    //   if (loginRes.data.captcha_required !== null) {
    //     setShowCaptcha(true);
    //   } else {
    //     navigate("/");
    //   }
    // } catch (error: any) {
    //   const { captcha_required } = error.response.data;
    //   if (captcha_required !== null) {
    //     setShowCaptcha(true);
    //   }
    //   setError("password", {
    //     type: "manual",
    //     message: "رمز عبور شما اشتباه هست، لطفا دوباره تلاش کنید",
    //   });
    // }
    const captchaInLocalStorage = captchaTime.get();
    if (
      captchaInLocalStorage &&
      JSON.parse(captchaInLocalStorage!)["captcha_required"] * 1000 > Date.now()
    )
      setShowCaptcha(true);
    else {
      const {
        data,
        status,
        errors: loginError,
      } = await authService.login({
        ...loginForms,
        ...values,
      });
      if (!loginError) {
        authToken.set({
          access: data?.access || "",
          refresh: data?.refresh || "",
        });
        await getProfile();
        navigate(PATH.profile);
      } else if (status === 429 && loginError) {
        captchaTime.set(JSON.stringify(loginError));
        setError("password", {
        type: "manual",
        message: "رمز عبور شما اشتباه هست، لطفا دوباره تلاش کنید",
      });
        setShowCaptcha(true);
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
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute inset-y-0 right-2 flex items-center text-gray-500"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
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
    </div>
  );
};
