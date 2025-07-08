import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PATH } from "@/lib/path";
import { Label } from "@radix-ui/react-label";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import type { ChangePasswordReq, PasswordPolicyType } from "../../types";
import PasswordPoliciesPopover from "../shared/PasswordPoliciesPopover";
import { useState } from "react";
import { ChangePasswordValidationSchema } from "../../schemaValidation";
import { yupResolver } from "@hookform/resolvers/yup";

export const Password = () => {
  const navigate = useNavigate();
  const [showPolicies, setShowPolicies] = useState(false);
  const [passwordPolicies, setPasswordPolicies] = useState<
    PasswordPolicyType[]
  >([]);
  const resolver = ChangePasswordValidationSchema(passwordPolicies);
  const { control, handleSubmit, watch } = useForm<ChangePasswordReq>({
    defaultValues: { code: "", password: "", refresh: "", new_password: "" },
    resolver: yupResolver(resolver) as any,
  });
  const passwordValue = watch("password");
  const onSubmit: SubmitHandler<ChangePasswordReq> = async (values) => {};
  return (
    <div>
      <p className="flex rtl text-[22px] font-bold text-newblack800 mb-4">
        ورود به حساب کاربری
      </p>
      <h2 className="flex rtl text-[14px] font-bold text-newblack500 mb-10">
        برای ورود لطفا شماره موبایل خط همراه اول خود را وارد کنید.
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-6">
          <PasswordPoliciesPopover
            open={showPolicies}
            password={passwordValue!}
            passwordPolicies={passwordPolicies}
            setPasswordPolicies={setPasswordPolicies}
          >
            <Controller
              name="password"
              control={control}
              render={({ field, fieldState }) => (
                <div className="grid w-full rtl ">
                  <Label htmlFor="password" className="mb-1">
                    رمز عبور
                  </Label>
                  <Input
                    {...field}
                    className={` bg-newblack200 h-[48px]
              `}
                    error={fieldState.error?.message}
                    onFocus={() => setShowPolicies(true)}
                    onBlur={() => setShowPolicies(false)}
                    placeholder="رمز عبور را وارد کنید"
                    type="password"
                    id="password"
                  />
                </div>
              )}
            />
          </PasswordPoliciesPopover>

          <Controller
            name="new_password"
            control={control}
            render={({ field, fieldState }) => (
              <div className="grid w-full rtl  ">
                <Label htmlFor="newPassword" className="mb-1">
                  تکرار رمز عبور
                </Label>
                <Input
                  {...field}
                  className={` bg-newblack200 h-[48px]
              `}
                  type="password"
                  id="newPassword"
                  placeholder="لطفا رمز عبور خود را تکرار کنید"
                  error={fieldState.error?.message}
                />
              </div>
            )}
          />
          <Button className="w-full mt-4 bg-primaryMain h-[48px] ">
            ادامه
          </Button>
        </div>
      </form>
      <div className="flex text-start rtl mt-6 gap-4 ">
        <img src="./clock.png" />
        <button
          onClick={() => navigate(PATH.profile)}
          className="text-sm text-primaryMain cursor-pointer"
        >
          بعدا وارد میکنم
        </button>
      </div>
    </div>
  );
};
