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
import { useLoginContext, type User } from "@/lib/loginContext";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { httpRequest } from "@/services/http";

interface CaptchaResponse {
  image: string;
  id: string;
}
interface CaptchaRequest {
  captcha_id: string;
  captcha_provider: string;
  captcha_value: string;
  phone: string;
  prefix: string;
}
export const CaptchDialog = () => {
  const [src, setSrc] = useState<string | null>(null);
  const { showCaptch, user, setUser, goToStep, setShowCaptcha } =
    useLoginContext();
  const fetchCaptcha = async () => {
    try {
      const res = await httpRequest.get<CaptchaResponse>(
        "v1/captcha/get-captcha/"
      );
      setSrc(res.data.image);
      setUser((prevUser: User) => ({
        ...prevUser,
        captcha_id: res.data.id,
      }));
    } catch (error) {
      console.error("Error fetching captcha:", error);
    }
  };
  useEffect(() => {
    fetchCaptcha();
  }, [showCaptch]);

  const { control, handleSubmit, resetField } = useForm<CaptchaRequest>({
    defaultValues: {
      captcha_id: "",
      captcha_provider: "MCI-CAPTCHA",
      captcha_value: "",
      phone: "",
      prefix: "+98",
    },
  });
  const onSubmit: SubmitHandler<CaptchaRequest> = async (data) => {
    try {
      await httpRequest.post("v6/profile/auth/generate-code/", {
        ...data,
        phone: user.phone,
        captcha_id: user.captcha_id,
      });

      goToStep("otp");
      setShowCaptcha(false);
      resetField("captcha_value");
    } catch (error) {
      alert(error);
    }
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

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex items-center gap-3 ">
              <button onClick={() => fetchCaptcha()} type="button">
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
                      error={!!fieldState}
                    />

                    {fieldState.error && (
                      <p className="text-sm flex rtl p-0 min-w-[] text-red-500">
                        {fieldState.error.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>
            <DialogFooter className="sm:justify-start">
              <Button
                type="submit"
                className="mt-4 bg-primaryMain h-[48px] w-full"
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
