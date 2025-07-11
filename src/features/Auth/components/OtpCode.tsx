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
import { useEffect, useState } from "react";
import type { ValidateOtp } from "../types";
import { authService } from "../services";
import useLoginStore from "@/zustand/useLoginForms";
import { authToken } from "@/lib/storage";
import { PATH } from "@/lib/path";
import { captchaTime } from "../storage";
import { CaptchDialog } from "./captchDialog";
import useAuthStore from "@/zustand/useAuthStore";
import { getValidCaptcha } from "@/lib/utils";

export const OtpCode = () => {
  const { user, goToStep, setShowCaptcha, showCaptch } = useLoginContext();
  const { loginForms } = useLoginStore();
  const { setUser } = useAuthStore((state) => state);

  const [countdown, setCountdown] = useState(15);
  const [isTimerActive, setIsTimerActive] = useState(true);
  const navigate = useNavigate();
  const { control, handleSubmit, setError, watch } = useForm<ValidateOtp>({
    defaultValues: {
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
    const captchaInLocalStorage = getValidCaptcha();
    if (captchaInLocalStorage) {
      console.log("if");
      setShowCaptcha(true);
    } else {
      setCountdown(15);
      setIsTimerActive(true);

      captchaTime.remove();

      const { data, errors: otpErrors } = await authService.generateOtp({
        ...loginForms,
      });

      if (data?.captcha_required !== null) {
        captchaTime.set(JSON.stringify(otpErrors));
      } else {
        alert("کد فعال‌سازی جدید ارسال شد.");
      }
    }
  };

  const onSubmit: SubmitHandler<ValidateOtp> = async (values) => {
    const captchaInLocalStorage = getValidCaptcha();

    if (captchaInLocalStorage) {
      console.log("if");
      setShowCaptcha(true);
    } else {
      const { status, errors: validateError } = await authService.validateOtp({
        ...loginForms,
        ...values,
      });
      if (!validateError) {
        const {
          data,
          status,
          errors: loginError,
        } = await authService.login({
          ...loginForms,
          code: Number(values.code),
        });
        if (data) {
          authToken.set({
            access: data?.access!,
            refresh: data?.refresh!,
          });
          console.log("dataaaaa", data);
          const profileRes = await authService.getProfile();
          if (profileRes) {
            setUser(profileRes.data);
          }
          navigate(PATH.profile);
        } else if (validateError.captcha_required !== null) {
          captchaTime.set(JSON.stringify(validateError));
        }
      } else if (validateError.captcha_required !== null) {
        captchaTime.set(JSON.stringify(validateError));
        setError("code", { message: "dvdکد وارد شده نادرست است" });
      } else {
        setError("code", { message: "کد وارد شده نادرست است" });
      }
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-4">
        <div className=" flex text-center  items-center  gap-3 rtl">
          <button
            onClick={() => goToStep("number")}
            className="  text-gray-500 flex items-start cursor-pointer"
            tabIndex={-1}
          >
            <img src="./arrow-left.png" />
          </button>
          <h1 className="flex rtl text-[22px] font-bold text-newblack800 ">
            تائید شماره موبایل
          </h1>
        </div>
        <h2 className="flex rtl text-[14px] font-bold text-newblack500 mb-8">
          لطفا کد ۴ رقمی ارسال شده به شماره{" "}
          <span className="text-sm text-primaryMain mx-1">{user.phone} </span>را
          وارد کنید.
        </h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-center items-center gap-4 mb-5">
          <Controller
            name="code"
            control={control}
            rules={{
              required: " کد الزامی است",
            }}
            render={({ field, fieldState }) => (
              <div className="flex flex-col items-center gap-1">
                <InputOTP
                  maxLength={6}
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                >
                  <InputOTPGroup className="flex rtl:flex-row-reverse gap-3">
                    {[0, 1, 2, 3, 4, 5].map((index) => (
                      <InputOTPSlot key={index} index={index} />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
                {fieldState.error && (
                  <p className="text-red-500 rtl text-sm mt-1">
                    {fieldState.error.message}
                  </p>
                )}
              </div>
            )}
          />
        </div>

        <Button type="submit" className="mt-5 w-full bg-primaryMain h-[48px]">
          تایید کد ارسالی
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

        <div className="flex items-center  rtl gap-2 ">
          <img src="./unlock.png" />
          <p
            onClick={() => goToStep("password")}
            className="text-primaryMain font-medium  text-[14px] cursor-pointer"
          >
            ورود با رمز عبور
          </p>
        </div>
      </form>
      {showCaptch && <CaptchDialog onSubmit={handleSubmit(onSubmit)} />}
    </div>
  );
};
