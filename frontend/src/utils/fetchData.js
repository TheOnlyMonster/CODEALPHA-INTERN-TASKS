import axios from "axios";
import { toast } from "react-toastify";

const instance = axios.create({
  baseURL: "http://localhost:5000",
});

const showToast = (message, type) => {
  toast.dismiss("isLoadingToastID");
  toast[type](message, {
    autoClose: 3000,
    position: "bottom-left",
  });
};

const fetchData = async (data = null, method, url, successMessage) => {
  try {
    toast.loading("Loading...", {
      toastId: "isLoadingToastID",
      position: "bottom-left",
    });
    let response;
    if (method === "post") {
      response = await instance.post(url, data);
    } else if (method === "get") {
      response = await instance.get(url);
    }
    showToast(successMessage, "success");
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
