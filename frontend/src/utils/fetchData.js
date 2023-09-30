import axios from "axios";
import { toast } from "react-toastify";

const instance = axios.create({
  baseURL: "http://localhost:5000",
});
instance.interceptors.request.use((request) => {
  const token = localStorage.getItem("token");
  if (token) {
    request.headers["Authorization"] = `Bearer ${token}`;
  }
  return request;
});
const showToast = (message, type = null) => {
  toast.dismiss("isLoadingToastID");
  toast[type](message, {
    autoClose: 2000,
    position: "bottom-left",
  });
};

const fetchData = async (data = null, method, url, successMessage) => {
  try {
    toast.loading("Loading...", {
      toastId: "isLoadingToastID",
      position: "bottom-left",
      theme: "light",
    });
    let response;
    if (method === "post") {
      response = await instance.post(url, data);
      showToast(successMessage, "success");
    } else if (method === "get") {
      response = await instance.get(url);
      toast.dismiss("isLoadingToastID");
    } else if (method === "put") {
      response = await instance.put(url, data);
      showToast(successMessage, "success");
    } else if (method === "delete") {
      response = await instance.delete(url);
      showToast(successMessage, "success");
    }
    return response;
  } catch (error) {
    console.log(error);
    const errorMessage = error.response
      ? error.response.data.msg
      : "Something went wrong!";
    showToast(errorMessage, "error");
    return error;
  }
};

export default fetchData;
