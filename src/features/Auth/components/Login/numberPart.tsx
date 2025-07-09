import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { useLoginContext } from "@/lib/loginContext";
import type { GenerateOtpReq } from "../../types";
import { captchaTime } from "../../storage";
import { authService } from "../../services";
import useLoginStore from "@/zustand/useLoginForms";
import { CaptchDialog } from "../shared/captchDialog";
import { NavLink, useNavigate } from "react-router";
import { PATH } from "@/lib/path";
import { useEffect } from "react";
import { Link } from "@/components/ui/Link";

export const NumberPart = () => {
  const { setShowCaptcha, goToStep, showCaptch } = useLoginContext();
  const { setLoginForms, loginForms } = useLoginStore();
  const { control, handleSubmit, formState, setValue } =
    useForm<GenerateOtpReq>();
  const navigate = useNavigate();
  useEffect(() => {
    if (loginForms?.phone) {
      const phoneWithZero = "0" + loginForms?.phone;
      setValue("phone", phoneWithZero);
    }
  }, []);
  const onSubmit: SubmitHandler<GenerateOtpReq> = async (values) => {
    const editedPhone =
      values?.phone && values?.phone.startsWith("0")
        ? values?.phone.slice(1)
        : values.phone;
    setLoginForms({ phone: editedPhone });
    const captchaInLocalStorage = captchaTime.get();

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

      if (!otpErrors) {
        goToStep("otp");
        if (data?.captcha_required !== null) {
          captchaTime.set(data);
        }
      }
      if (data?.captcha_required !== null) {
        captchaTime.set(data);
      }
      if (otpErrors) {
        captchaTime.set(otpErrors);
        alert("کپچا نادرست است  ");
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
                className={`ltr h-[48px]
              `}
                type="text"
                id="phone"
                placeholder="9** *** ***"
                error={fieldState.error?.message}
              />
            </div>
          )}
        />
        <Button
          disabled={formState.isSubmitting}
          className="mt-8 w-full bg-primaryMain h-[48px] "
        >
          ورود
        </Button>
      </form>

      <div className="flex text-start rtl mt-6 gap-4 ">
        <p className="text-sm font-medium">حساب کاربری ندارید؟</p>
        <Link to={PATH.register}>ثبت نام کنید</Link>
      </div>
      {showCaptch && <CaptchDialog onSubmit={handleSubmit(onSubmit)} />}
    </div>
  );
};
