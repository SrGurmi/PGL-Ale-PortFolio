export type User = {
  fullname: string;
  email: string;
  pswd: string;
};

export const getDefaultUser = () => {
  return {
    fullname: "",
    email: "",
    pswd: "",
  };
};
