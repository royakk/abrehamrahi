import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { useLoginContext } from "@/lib/loginContext";
import { Controller, useForm } from "react-hook-form";
import type { CaptchaDialogProps, LoginReq } from "../types";
import { authService } from "../services";
import useLoginStore from "@/zustand/useLoginForms";
import { captchaTime } from "../storage";

export const CaptchDialog = ({ onSubmit }: CaptchaDialogProps) => {
  const [src, setSrc] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { setShowCaptcha, showCaptch } = useLoginContext();
  const { setLoginForms } = useLoginStore();

  const { control, watch } = useForm<LoginReq>({
    defaultValues: {
      captcha_provider: "MCI-CAPTCHA",
    },
  });
  const getCaptcha = async () => {
    const {
      data,

      errors: captchaErrors,
    } = await authService.getCaptcha();
    if (data) {
      setSrc(data.image);
      setLoginForms({ captcha_id: data.id, captcha_provider: data.provider });
    } else
      setLoginForms({
        captcha_id: "",
        captcha_provider: "",
        captcha_value: "",
      });
  };
  useEffect(() => {
    getCaptcha();
  }, [showCaptch]);
  const captchaValue = watch("captcha_value");

  useEffect(() => {
    setLoginForms({ captcha_value: captchaValue });
  }, [captchaValue]);
  const submitHandler = async () => {
    setLoading(true);
    captchaTime.remove();
    await onSubmit();
    setLoading(false);
    setShowCaptcha(false);
  };

  return (
    <div>
      <Dialog open={true} onOpenChange={(open) => setShowCaptcha(open)}>
        <DialogContent className="w-[376px] sm:w-[488px] px-[29px] sm:px-[59px] py-8 ltr ">
          <DialogHeader className="text-left">
            <DialogDescription className="text-right text-[16px] text-newblack500">
              :کلمات تصویر را وارد کنید
            </DialogDescription>
          </DialogHeader>

          <form
            onSubmit={async (e) => {
              e.preventDefault();
              e.stopPropagation();
              await submitHandler();
            }}
          >
            <div className="flex items-center gap-3 ">
              <button onClick={() => getCaptcha()} type="button">
                <img src="./refresh-2.png" alt="refresh" />
              </button>
              {src ? (
                <img
                  width={133}
                  style={{ height: 42, objectFit: "fill" }}
                  src={`${src}`}
                  alt="captcha"
                />
              ) : (
                <p>Loading captcha...</p>
              )}

              <Controller
                name="captcha_value"
                control={control}
                rules={{
                  required: "کد  کپچا الزامی است",
                  minLength: {
                    value: 5,
                    message: "کپچا  باید  5 کاراکتر باشد",
                  },
                }}
                render={({ field, fieldState }) => (
                  <div>
                    <Input
                      {...field}
                      id="captch"
                      className={`ltr h-[40px] sm:w-[189px] pr-10 `}
                      error={fieldState.error?.message}
                    />
                  </div>
                )}
              />
            </div>
            <DialogFooter className="sm:justify-start">
              <Button
                type="submit"
                className="mt-4 bg-primaryMain h-[48px] w-full"
                disabled={loading}
              >
                ادامه
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
