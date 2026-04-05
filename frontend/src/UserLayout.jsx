import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import FooterSection from "./components/FooterSection";

function UserLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <FooterSection />
    </>
  );
}

export default UserLayout;