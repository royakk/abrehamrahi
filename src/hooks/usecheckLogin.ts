import { PATH } from "@/lib/path";
import { authToken } from "@/lib/storage";
import { getProfile } from "@/services/authorisation";
import useAuthStore from "@/zustand/useAuthStore";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const useCheckLogin = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if (authToken.get()) {
        const { data } = await getProfile();
        setUser(data);
      } else {
        navigate(PATH.login);
        setUser(null);
      }
    })();
  }, []);
};

export default useCheckLogin;
