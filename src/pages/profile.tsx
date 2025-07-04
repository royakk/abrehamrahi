import { httpRequest } from "@/services/http";
import { useEffect } from "react";

export const Profile = () => {
  useEffect(() => {
    const getProfile = async () => {
      httpRequest.get("v6/profile/auth/get-profile/");
    };
    getProfile();
  }, []);
  return <div>Profile</div>;
};
