import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { PasswordPolicyType } from "../../types";
import { useEffect, type Dispatch, type SetStateAction } from "react";
import { authService } from "../../services";
import { toast } from "sonner";
import { PopoverArrow } from "@radix-ui/react-popover";

const PasswordPoliciesPopover = ({
  password,
  passwordPolicies = [],
  setPasswordPolicies,
  children,
  open,
}: {
  password: string;
  passwordPolicies?: PasswordPolicyType[];
  setPasswordPolicies: Dispatch<SetStateAction<PasswordPolicyType[]>>;
  children: React.ReactNode;
  open: boolean;
}) => {
  useEffect(() => {
    const handleGetPasswordPolicies = async () => {
      const { data, errors } = await authService.getPasswordPolicies();
      if (data) {
        setPasswordPolicies(data.regexes);
      } else toast(`${errors}`);
    };
    handleGetPasswordPolicies();
  }, []);

  return (
    <Popover open={open}>
      <PopoverTrigger className="w-full text-start">{children}</PopoverTrigger>
      <PopoverContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        side="top"
        align="center"
        sideOffset={5}
        className={` rtl bg-newblack200 relative top-2 w-[330px] rounded-[16px]  md:w-[420px]`}
      >
        <PopoverArrow className="fill-newblack200 drop-shadow-md w-[20px] h-[10px]" />
        <div className="flex flex-col gap-3">
          {Array.isArray(passwordPolicies) &&
            passwordPolicies.map((policy, index) => (
              <div className="flex items-start gap-2" key={index}>
                <img
                  src={
                    password?.match(new RegExp(policy.pattern))
                      ? "./tick-circle.svg"
                      : "./key.svg"
                  }
                  className="size-4 md:size-5"
                />
                <span
                  className={`text-[13px] md:text-sm ${
                    password?.match(new RegExp(policy.pattern)) &&
                    "font-medium text-cyan-800"
                  } `}
                >
                  {policy.message}
                </span>
              </div>
            ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default PasswordPoliciesPopover;
