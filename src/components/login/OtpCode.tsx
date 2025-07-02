import type { SubmitHandler } from "react-hook-form";
import { useForm, Controller } from "react-hook-form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { useLoginContext } from "@/lib/loginContext";
import { http } from "@/services/http";
import { generateCode, login } from "@/services/login";
import { useEffect, useState } from "react";

type OtpRequest = {
  captcha_id: string;
  captcha_provider: string;
  captcha_value: string;
  phone: string;
  prefix: string;
  code: string;
};

export const OtpCode = () => {
  const { user, goToStep, setShowCaptcha } = useLoginContext();
  const [countdown, setCountdown] = useState(10);
  const [isTimerActive, setIsTimerActive] = useState(true);
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<OtpRequest>({
    defaultValues: {
      phone: "",
      prefix: "+98",
      code: "",
    },
  });

  useEffect(() => {
    if (isTimerActive && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      setIsTimerActive(false);
    }
  }, [isTimerActive, countdown]);

  const handleResendCode = async () => {
    try {
      const res = await generateCode({
        phone: user.phone,
        prefix: "+98",
      });
      if (res.captcha_required !== null) {
        setShowCaptcha(true);
        window.localStorage.setItem("captchaTime", res.captcha_required);
      }
      setCountdown(10);
      setIsTimerActive(true);
    } catch (error: any) {
      const { captcha_required } = error.response.data;
      if (captcha_required !== null) {
        setShowCaptcha(true);
      }
      console.error("Error resending OTP:", error);
    }
  };

  const onSubmit: SubmitHandler<OtpRequest> = async (data) => {
    try {
      await http.post("v6/profile/auth/validate-otp/", {
        ...data,
        phone: user.phone,
        captcha_id: user.captcha_id,
      });

      await login({
        ...data,
        phone: user.phone,
        captcha_id: user.captcha_id,
        code: Number(data.code),
      });

      navigate("/profile");
    } catch (error: any) {
      setError("code", {
        type: "manual",
        message: "کد وارد شده نادرست است.",
      });
    }
  };

  return (
    <div>
      <div className="flex gap-2 rtl">
        <button
          className="text-gray-500 cursor-pointer"
          tabIndex={-1}
          onClick={() => goToStep("number")}
        >
          <img src="./arrow-left.png" />
        </button>
        <h1 className="flex rtl text-[22px] font-bold text-newblack800 mb-4">
          تائید شماره موبایل
        </h1>
      </div>
      <h2 className="flex rtl text-[14px] font-bold text-newblack500 mb-10">
        لطفا کد ۴ رقمی ارسال شده به شماره {user.phone} را وارد کنید.
      </h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-center items-center gap-4 mb-5">
          <Controller
            name="code"
            control={control}
            render={({ field, fieldState }) => (
              <div className="flex flex-col items-center gap-1">
                <InputOTP
                  maxLength={6}
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  autoFocus
                  pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                >
                  <InputOTPGroup className="flex rtl:flex-row-reverse gap-3">
                    {[0, 1, 2, 3, 4, 5].map((index) => (
                      <InputOTPSlot key={index} index={index} />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
                {fieldState.error && (
                  <p className="text-red-500 text-sm mt-1">
                    {fieldState.error.message}
                  </p>
                )}
              </div>
            )}
          />
        </div>

        <Button type="submit" className="mt-4 w-full bg-primaryMain h-[48px]">
          ورود
        </Button>

        <div className="flex gap-2 rtl  my-3 text-sm">
          <img src="./rotate-left.png" />
          {isTimerActive ? (
            <p className="text-gray-500">
              ارسال مجدد کد فعال‌سازی بعد از{" "}
              <span className="text-primaryMain">{countdown}</span> ثانیه
            </p>
          ) : (
            <button
              type="button"
              onClick={handleResendCode}
              className="text-primaryMain "
            >
              ارسال مجدد کد فعال‌سازی
            </button>
          )}
        </div>

        <div className="flex my-4 rtl gap-1 ">
          <img src="./sms.png" />
          <p
            onClick={() => goToStep("password")}
            className="text-primaryMain text-[14px] cursor-pointer"
          >
            ورود با رمز عبور
          </p>
        </div>
      </form>
    </div>
  );
};
