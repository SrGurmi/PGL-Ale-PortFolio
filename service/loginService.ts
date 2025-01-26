import { User } from "../types/User";
import { asyncStorageService } from "./async-storage-service";

const IP = "192.168.1.60";

// 172.16.102.71

const registerUser = async (user: User) => {
  const response = await fetch("http://" + IP + ":5000/auth/register", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fullname: user.fullname,
      email: user.email,
      pswd: user.pswd,
    }),
  });

  if (response.status == 409) {
    return null;
  }

  return response.json();
};

const loginUser = async (user: User) => {
  const response = await fetch("http://" + IP + ":5000/auth/login", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: user.email,
      pswd: user.pswd,
    }),
  });

  if (response.status == 401) {
    return null;
  }
  const jsonValue = await response.json();
  await asyncStorageService.save(asyncStorageService.KEYS.userToken, jsonValue);

  console.log(
    "Token guardado:",
    await asyncStorageService.get(asyncStorageService.KEYS.userToken)
  );

  return jsonValue;
};

const LoginService = {
  registerUser,
  loginUser,
};
export default LoginService;
