import { authService } from "@/features/Auth/services";
import { PATH } from "@/lib/path";
import { authToken } from "@/lib/storage";
import useAuthStore from "@/zustand/useAuthStore";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const useCheckLogin = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();
  console.log("user", user);

  useEffect(() => {
    (async () => {
      if (authToken.get()) {
        const { data } = await authService.getProfile();
        setUser(data);
      } else {
        navigate(PATH.login);
        setUser(null);
      }
    })();
  }, []);
};

export default useCheckLogin;
