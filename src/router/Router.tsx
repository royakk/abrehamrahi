import { Navigate, Route, Routes } from "react-router-dom";
import useAuthStore from "../zustand/useAuthStore";
import { Login } from "../pages/Auth/login";
import { ProfilePage } from "../pages/Auth/profile";
import useCheckLogin from "../hooks/usecheckLogin";
import { PATH } from "../lib/path";
import Loading from "@/components/ui/loading";
import { ChangePasswordPage } from "@/pages/Auth/ChangePassword";
import { RegisterPage } from "@/pages/Auth/Register";

export default function Router() {
  const user = useAuthStore((state) => state.user);
  useCheckLogin();

  return (
    <Routes>
      {user ? (
        <>
          <Route path={PATH.profile} element={<ProfilePage />} />
          <Route path={PATH.login} element={<Navigate to="/" replace />} />
          <Route path={PATH.changePassword} element={<ChangePasswordPage />} />
        </>
      ) : user === null ? (
        <>
          <Route path={PATH.login} element={<Login />} />
          <Route path={PATH.register} element={<RegisterPage />} />
          <Route path="*" element={<Navigate to={PATH.login} replace />} />
        </>
      ) : (
        <Route path="*" element={<Loading />} />
      )}
    </Routes>
  );
}
