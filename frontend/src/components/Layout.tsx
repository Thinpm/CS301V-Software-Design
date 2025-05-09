
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import CanvasCursor from "./CanvasCursor";

const Layout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50">
      <CanvasCursor />
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
