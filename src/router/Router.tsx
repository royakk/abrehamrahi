import { Navigate, Route, Routes } from "react-router";
import useAuthStore from "../zustand/useAuthStore";
import { Login } from "../pages/Auth/login";
import { ProfilePage } from "../pages/Auth/profile";
import useCheckLogin from "../hooks/usecheckLogin";
import { PATH } from "../lib/path";
import Loading from "@/components/ui/loading";
import { ChangePasswordPage } from "@/pages/Auth/ChangePassword";
import { RegisterPage } from "@/pages/Auth/Register";
// import ProtectedRoute from "./ProtectedRoutes";

export default function Router() {
  const { user, setUser } = useAuthStore((state) => state);

  useCheckLogin();
  if (user === undefined) {
    return (
      <Routes>
        <Route path="*" element={<Loading />} />
      </Routes>
    );
  }

  return (
    <>
      <Routes>
        {user ? (
          <>
            <Route
              path={PATH.changePassword}
              element={<ChangePasswordPage />}
            />
            <Route path={PATH.profile} element={<ProfilePage />} />
            <Route path={PATH.login} element={<Navigate to={PATH.profile} />} />
          </>
        ) : (
          <>
            <Route path={PATH.register} element={<RegisterPage />} />
            <Route path={PATH.login} element={<Login />} />
          </>
        )}
      </Routes>
    </>

    // <Routes>
    //     <Route element={<ProtectedRoute />}>
    //       <Route path={PATH.profile} element={<ProfilePage />} />
    //       <Route path={PATH.changePassword} element={<ChangePasswordPage />} />
    //     </Route>

    //     <Route path={PATH.register} element={<RegisterPage />} />
    //     <Route path={PATH.login} element={<Login />} />

    //     <Route path="*" element={<Loading/>} />
    //   </Routes>
  );
}
