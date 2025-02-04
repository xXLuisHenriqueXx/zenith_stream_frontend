import { useState } from "react";
import { tv } from "tailwind-variants";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";

import Sidebar from "../Sidebar";
import { useAuth } from "../../../hooks/useAuth";

const card = tv({
  slots: {
    containerMain: "fixed top-0 flex justify-between items-center w-full p-4 xl:px-12 2xl:px-24 bg-transparent z-50",
    icon: "w-8 h-8 lg:w-10 lg:h-10 text-white cursor-pointer",
    button: "flex flex-row items-center justify-center h-10 px-4 bg-transparent hover:bg-blue-500 border-2 border-blue-500 rounded-sm text-white hover:text-slate-900 transition-all duration-200",
    buttonText: "text-sm lg:text-base font-inter font-bold uppercase",
  },
});

const { containerMain, icon, button, buttonText } = card();

function Navbar() {
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = async () => {
    logout();

    window.location.href = "/";
  };

  return (
    <>
      <nav className={containerMain()}>
        <Menu onClick={() => setShowSidebar(!showSidebar)} className={icon()} />

        {isAuthenticated ? (
          <button className={button()} onClick={handleLogout}>
            <p className={buttonText()}>Logout</p>
          </button>
        ) : (
          <Link to={"/user/login"} className={button()}>
            <p className={buttonText()}>Acessar</p>
          </Link>
        )}
      </nav>

      {showSidebar && <Sidebar setShowSidebar={setShowSidebar} />}
    </>
  );
}

export default Navbar;
