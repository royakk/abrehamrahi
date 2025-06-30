import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
type Inputs = {
  password: string;
};

export const PasswordPart = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      password: "",
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log("✅ Submitted data:", data);
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
        <div className="grid w-full rtl gap-4">
          <Controller
            name="password"
            control={control}
            rules={{
              required: "رمز عبور شما اشتباه هست، لطفا دوباره تلاش کنید",
              minLength: {
                value: 6,
                message: "رمز عبور باید حداقل ۶ کاراکتر باشد",
              },
            }}
            render={({ field, fieldState }) => (
              <>
                <Label htmlFor="password" className="mb-1">
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

          <Button type="submit" className="mt-4 bg-primaryMain h-[48px]">
            ورود
          </Button>
        </div>
      </form>
    </div>
  );
};
