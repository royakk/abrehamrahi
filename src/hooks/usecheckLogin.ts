import { authService } from "@/features/Auth/services";
import { PATH } from "@/lib/path";
import { authToken } from "@/lib/storage";
import useAuthStore from "@/zustand/useAuthStore";
import { useEffect } from "react";
import { useNavigate } from "react-router";
export const getProfile = async () => {
  const { setUser, user } = useAuthStore((state) => state);
  const { data } = await authService.getProfile();

  // if (data?.user_active_package) {
  //     const response = await planUseCase.getPlan(data?.user_active_package.id);
  //     console.log(response);
  // }
};
const useCheckLogin = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();
  console.log("user", user);

  useEffect(() => {
    (async () => {
      if (authToken.get()) {
        console.log("authTokenif", authToken);
        const { data } = await authService.getProfile();
        setUser(data);
      } else {
        console.log("authTokenelseerror", authToken);
        // navigate(PATH.login);
        // setUser(null);
      }
    })();
  }, []);
};

export default useCheckLogin;
