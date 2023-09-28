import axios from "axios";
import { toast } from "react-toastify";

const instance = axios.create({
  baseURL: "http://localhost:5000",
});

const showToast = (message, type=null) => {
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
    }
    return response;
  } catch (error) {
    const errorMessage = error.response
      ? error.response.data.msg
      : "Something went wrong!";
    showToast(errorMessage, "error");
    return false;
  }
};

export default fetchData;
