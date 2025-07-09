import { Route, Routes } from "react-router";
import useAuthStore from "../zustand/useAuthStore";
import { Login } from "../pages/Auth/login";
import { ProfilePage } from "../pages/Auth/profile";
import useCheckLogin from "../hooks/usecheckLogin";
import { PATH } from "../lib/path";
import Loading from "@/components/ui/loading";
import { ChangePasswordPage } from "@/pages/Auth/ChangePassword";
import { RegisterPage } from "@/pages/Auth/Register";

export default function Router() {
  const { user, setUser } = useAuthStore((state) => state);

  useCheckLogin();

  return (
    <>
      {user ? (
        <Routes>
          <Route path={PATH.changePassword} element={<ChangePasswordPage />} />
          <Route path={PATH.profile} element={<ProfilePage />} />
        </Routes>
      ) : user === null ? (
        <Routes>
          <Route path={PATH.register} element={<RegisterPage />} />
          <Route path={PATH.login} element={<Login />} />
          {/* <Route  path="*" element={<Navigate to={PATH.login} replace />} /> */}
        </Routes>
      ) : (
        <Loading />
      )}
    </>

    // <Routes>
    //     {/* <Route element={<ProtectedRoute />}>
    //       <Route path={PATH.profile} element={<ProfilePage />} />
    //       <Route path={PATH.changePassword} element={<ChangePasswordPage />} />
    //     </Route>

    //     <Route path={PATH.register} element={<RegisterPage />} />
    //     <Route path={PATH.login} element={<Login />} />

    //     <Route path="*" element={<Navigate to={PATH.login} replace />} />
    //   </Routes> */}
  );
}
