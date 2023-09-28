import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import NavigationBar from "./NavigationBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function ParentElements() {
  return (
    <>
      <NavigationBar />
      <Outlet />
      <ToastContainer theme="colored" />
      <Footer />
    </>
  );
}
