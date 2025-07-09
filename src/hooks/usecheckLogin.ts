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
  console.log("userrrrr", user);

  useEffect(() => {
    (async () => {
      console.log("here");
      if (authToken.get()) {
        const { data, status } = await authService.getProfile();
        if (data) {
          setUser(data);
        } else {
          authToken.remove();
          setUser(null);
          navigate(PATH.login);
        }
      } else {
        navigate(PATH.login);
        setUser(null);
      }
    })();
  }, []);
};

export default useCheckLogin;
