import { createContext, useContext, useState, type ReactNode } from "react";

type Step = "number" | "password" | "otp";

interface LoginContextType {
  step: Step;

  goToStep: (step: Step) => void;
  nextStep: () => void;
  showCaptch: boolean;
  setShowCaptcha: (captch: boolean) => void;
}

const LoginContext = createContext<LoginContextType | null>(null);

const steps: Step[] = ["number", "password", "otp"];

export const LoginProvider = ({ children }: { children: ReactNode }) => {
  const [step, setStep] = useState<Step>("number");
  const [showCaptch, setShowCaptcha] = useState(false);

  const goToStep = (s: Step) => setStep(s);

  const nextStep = () => {
    const currentIndex = steps.indexOf(step);
    const next = steps[currentIndex + 1];
    if (next) setStep(next);
  };

  return (
    <LoginContext.Provider
      value={{
        step,
        goToStep,
        nextStep,
        showCaptch,
        setShowCaptcha,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export const useLoginContext = () => {
  const context = useContext(LoginContext);
  if (!context)
    throw new Error("useLoginContext must be used within LoginProvider");
  return context;
};
