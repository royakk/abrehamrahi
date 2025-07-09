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
import { useNavigate } from "react-router";
import { PATH } from "@/lib/path";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";
import { regexPhone } from "@/lib/utils";

export const CreateAcount = () => {
  const { setShowCaptcha, goToStep, showCaptch } = useLoginContext();
  const { setLoginForms, loginForms } = useLoginStore();
  const [confirm, setConfirm] = useState(false);
  const [isPending, setIspending] = useState(false);

  const { control, handleSubmit, setValue } = useForm<GenerateOtpReq>({
    defaultValues: {
      phone: "",
      prefix: "+98",
    },
  });
  useEffect(() => {
    const phoneWithZero = "0" + loginForms?.phone;
    setValue("phone", phoneWithZero);
  }, []);
  const navigate = useNavigate();
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
      setIspending(true);
      const {
        data,
        status,
        errors: otpErrors,
      } = await authService.generateOtp({
        ...values,
        ...loginForms,
        phone: editedPhone,
      });
      setIspending(false);

      if (!otpErrors) {
        goToStep("otp");
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
  console.log("confirm", confirm);
  return (
    <div>
      <p className="flex rtl text-[22px] font-bold text-newblack800 mb-4">
        ایجاد حساب کاربری
      </p>
      <h2 className="flex rtl text-[14px] font-bold text-newblack500 mb-10">
        برای ثبت نام لطفا شماره موبایل خود را وارد کنید.
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="phone"
          control={control}
          rules={{
            required: "شماره موبایل الزامی است",
            validate: {
              pattern: (value) =>
                regexPhone.phone.test(value!) || "شماره موبایل نامعتبر است",
            },
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
                placeholder="09* *** ***"
                error={fieldState.error?.message}
              />
              <div className="flex gap-2 mt-6">
                <Checkbox
                  checked={confirm}
                  onCheckedChange={() => setConfirm((prev) => !prev)}
                  id="terms"
                  className="data-[state=checked]:bg-primaryMain rounded-[6px] data-[state=checked]:border-none"
                />
                <Label htmlFor="terms">
                  پذیرش <span className="text-primaryMain">شرایط و قوانین</span>
                  استفاده از ابرهمراهی
                </Label>
              </div>
              <Button
                type="submit"
                disabled={!confirm || isPending}
                className="mt-8 bg-primaryMain h-[48px] "
              >
                ثبت نام
              </Button>
            </div>
          )}
        />
      </form>
      <div className="flex text-start rtl mt-6 gap-4 ">
        <p className="text-sm font-medium"> قبلا ثبت نام کرده اید؟ </p>
        <button
          onClick={() => navigate(PATH.login)}
          className="text-sm text-primaryMain cursor-pointer"
        >
          وارد شوید
        </button>
      </div>
      {showCaptch && <CaptchDialog onSubmit={handleSubmit(onSubmit)} />}
    </div>
  );
};
