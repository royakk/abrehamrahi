import { useLoginContext } from "@/lib/loginContext";
import { PATH } from "@/lib/path";
import { authToken } from "@/lib/storage";
import useLoginStore from "@/zustand/useLoginForms";
import { useNavigate } from "react-router";

export const ProfilePage = () => {
  const { loginForms, setLoginForms } = useLoginStore();
  console.log("loginForms", loginForms);
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-5">
      <h1>Profile Page</h1>
      <button
        className="cursor-pointer"
        onClick={() => {
          authToken.remove();
          window.location.reload();
        }}
      >
        sign out
      </button>
      <button
        className="cursor-pointer"
        onClick={() => {
          navigate(PATH.changePassword);
        }}
      >
        change password
      </button>
    </div>
  );
};
