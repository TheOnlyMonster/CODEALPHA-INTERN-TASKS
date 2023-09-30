import { redirect } from "react-router-dom";
import decode from "jwt-decode";
const authentication = (redirection, directTo) => {
  const token = localStorage.getItem("token");
  if (token) {
    const decodedToken = decode(token);
    if (decodedToken.exp * 1000 < Date.now()) {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("firstName");
      localStorage.removeItem("lastName");
      return redirection ? redirect(directTo) : true;
    }
    return redirection ? true : redirect(directTo);
  }
  return redirection ? redirect(directTo) : true;
};
export const isAuthenticated = () => authentication(true, "/sign-in");
export const isNotAuthenticated = () => authentication(false, "/");
