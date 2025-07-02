import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { useLoginContext, type User } from "@/lib/loginContext";
import { useNavigate } from "react-router-dom";
import { login } from "@/services/authorisation";

type PasswordRequest = {
  country: string;
  password: string;
  phone: string;
  prefix: string;
};

export const PasswordPart = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { goToStep, setUser, user, setShowCaptcha } = useLoginContext();

  const { control, handleSubmit, setError } = useForm<PasswordRequest>({
    defaultValues: {
      country: "IR",
      password: "",
      phone: "",
      prefix: "+98",
    },
  });
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<PasswordRequest> = async (data) => {
    setUser((prevUser: User) => ({
      ...prevUser,
      password: data.password,
    }));
    try {
      const loginRes = await login({ ...data, phone: user.phone });
      if (loginRes.data.captcha_required !== null) {
        setShowCaptcha(true);
      } else {
        navigate("/profile");
      }
    } catch (error: any) {
      const { captcha_required } = error.response.data;
      if (captcha_required !== null) {
        setShowCaptcha(true);
      }
      setError("password", {
        type: "manual",
        message: "رمز عبور شما اشتباه هست، لطفا دوباره تلاش کنید",
      });
    }
  };

  return (
    <div className="rtl">
      <div className="flex gap-2">
        <button
          onClick={() => goToStep("number")}
          className="  text-gray-500 cursor-pointer"
          tabIndex={-1}
        >
          <img src="./arrow-left.png" />
        </button>
        <h1 className="flex rtl text-[22px] font-bold text-newblack800 mb-4">
          ورود به حساب کاربری
        </h1>
      </div>
      <h2 className="flex rtl text-[14px] font-bold text-newblack500 mb-10">
        برای ورود لطفا شماره موبایل خط همراه اول خود را وارد کنید.
      </h2>

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
                    className={`ltr pr-10 ${
                      fieldState.error ? "border-red-500" : ""
                    }`}
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
                {fieldState.error && (
                  <p className="text-sm flex items-start p-0 text-red-500">
                    {fieldState.error.message}
                  </p>
                )}
              </>
            )}
          />

          <Button type="submit" className="mt-10 bg-primaryMain h-[48px]">
            ورود
          </Button>
        </div>
      </form>
      <div>
        <div className="flex my-4 gap-1">
          <img src="./sms.png" />
          <p
            onClick={() => goToStep("otp")}
            className="text-primaryMain text-[14px] cursor-pointer"
          >
            ورود با رمز یک بار مصرف
          </p>
        </div>
        <div className="flex gap-1">
          <img src="./unlock.png" />
          <p className="text-primaryMain text-[14px] cursor-pointer">
            بازیابی رمز عبور{" "}
          </p>
        </div>
      </div>
    </div>
  );
};
