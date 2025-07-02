import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { useLoginContext, type User } from "@/lib/loginContext";
import { isPast } from "@/lib/utils";
import { generateCode } from "@/services/authorisation";
export type GenerateCode = {
  phone: string;
  request_type?: number;
  prefix: string;
  captcha_value?: string;
  captcha_proivider?: string;
  captcha_id?: string;
};
export const NumberPart = () => {
  const { setUser, setShowCaptcha, goToStep } = useLoginContext();

  const { control, handleSubmit } = useForm<GenerateCode>({
    defaultValues: {
      phone: "",
      prefix: "+98",
    },
  });

  const onSubmit: SubmitHandler<GenerateCode> = async (data) => {
    const phone = data.phone.startsWith("0") ? data.phone.slice(1) : data.phone;
    if (!isPast()) {
      setShowCaptcha(true);
    } else {
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
                type="text"
                id="phone"
                placeholder="09** *** ***"
                error={!!fieldState.error}
                {...field}
              />
              {fieldState.error && (
                <span className="text-red-500 text-sm">
                  {fieldState.error.message}
                </span>
              )}
              <Button className="mt-8 bg-primaryMain h-[48px] ">ورود</Button>
            </div>
          )}
        />
      </form>
    </div>
  );
};
