import axios from "axios";
import { toast } from "react-toastify";
const instance = axios.create({
  baseURL: "http://localhost:5000",
});
export default async function fetchData(data, method, url, successMessage) {
  toast.loading("Loading...", {
    toastId: "isLoadingToastID",
    position: "bottom-left",
  });
  if (method === "post") {
    try {
      await instance.post(url, data);
      toast.dismiss("isLoadingToastID");
      return toast.success(successMessage, {
        autoClose: 3000,
        position: "bottom-left",
      });
    } catch (error) {
      let msg = error.response
        ? error.response.data.msg
        : "Something went wrong!";
      // return { error: msg };
      toast.dismiss("isLoadingToastID");
      return toast.error(msg, {
        autoClose: 3000,
        position: "bottom-left",
      });
    }
  }
}
