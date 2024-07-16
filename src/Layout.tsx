import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = ({ sendDataToApp }: any) => {
  return (
    <>
      <Navbar sendDataToApp={sendDataToApp} />
      <Outlet />
    </>
  );
};

export default Layout;
