import * as yup from "yup";
import type { PasswordPolicyType } from "./types";

export const ChangePasswordValidationSchema = (
  passwordPolicies: PasswordPolicyType[]
) => {
  const checkPasswordValidation = passwordPolicies.reduce(
    (schema, policy) => schema.matches(policy.pattern, policy.message),
    yup.string()
  );

  return yup.object({
    refresh: yup.string().optional(),
    code: yup.string().optional(),
    password: checkPasswordValidation.required(
      "وارد کردن رمز عبور الزامی است."
    ),
    new_password: yup
      .string()
      .oneOf(
        [yup.ref("password"), undefined],
        "رمز عبور با تکرار آن باید یکسان باشند."
      )
      .required("وارد کردن تکرار رمز عبور الزامی است."),
  });
};
