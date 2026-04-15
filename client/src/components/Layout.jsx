import { Outlet } from "react-router-dom"; // Add this import
import Navbar from "./Navbar";
import Footer from "./Footer"

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
          <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;