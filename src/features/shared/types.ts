export type UserViewModel = {
  id: number;
  phone: string;
  name: string;
  description: string;
  picture_url: string;
  banner_url: string;
  chanell: string;
  withdrawable_balance: number;
  gifted_balance: number;
  orgs: Orgs[];
};
interface Orgs {
  id: number;
  name: string;
  total_quota: number;
  used: number;
  quota_exp: number;
  managers: Managers[];
}
interface Managers {
  id: number;
  name: string;
  phone: string;
  picture_url: string;
  prefix: string;
}
