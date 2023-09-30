import { redirect } from "react-router-dom";
import fetchData from "../utils/fetchData";
import { AxiosError } from "axios";
export default async function signInAction({ request, params }) {
  const body = await request.formData();
  const response = await fetchData(
    body,
    "post",
    "/sign-in",
    "Logged in successfully"
  );
  if (response instanceof AxiosError) {
    return false;
  }
  localStorage.setItem("token", response.data.token);
  localStorage.setItem("userId", response.data.userId);
  localStorage.setItem("firstName", response.data.firstName);
  localStorage.setItem("lastName", response.data.lastName);
  return redirect("/");
}
