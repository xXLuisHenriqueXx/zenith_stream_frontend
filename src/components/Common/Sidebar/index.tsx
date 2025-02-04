import { Airplay, LogIn, LogOut, TvMinimal } from "lucide-react";
import { Link } from "react-router-dom";
import { tv } from "tailwind-variants";
import { useAuth } from "../../../hooks/useAuth";

const card = tv({
  slots: {
    containerMain: "fixed w-full h-screen bg-slate-950 bg-opacity-90 z-50",
    containerSidebar: "flex flex-col w-[21.5rem] h-screen bg-slate-900 z-[99]",
    containerTitle:
      "flex flex-col items-center justify-center w-full h-20 border-b border-slate-800",
    containerButtons: "flex flex-col items-center justify-center w-full h-full",
    title: "text-lg font-semibold text-white",
    button:
      "relative flex items-center justify-center w-[20rem] h-14 mt-4 border-2 border-slate-800 rounded-md hover:bg-slate-800",
    buttonIcon:
      "absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-white",
    buttonText: "text-lg font-semibold text-white",
  },
});

const {
  containerMain,
  containerSidebar,
  containerTitle,
  containerButtons,
  title,
  button,
  buttonIcon,
  buttonText,
} = card();

interface Props {
  setShowSidebar: (visiblie: boolean) => void;
}

function Sidebar({ setShowSidebar }: Props) {
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = async () => {
    logout();

    window.location.href = "/";
  };

  return (
    <div onClick={() => setShowSidebar(false)} className={containerMain()}>
      <div onClick={(e) => e.stopPropagation()} className={containerSidebar()}>
        <div className={containerTitle()}>
          <h1 className={title()}>Olá, tudo bem?</h1>
        </div>

        <div className={containerButtons()}>
          {!isAuthenticated && (
            <Link to={"/user/login"} className={button()}>
              <LogIn className={buttonIcon()} />
              <span className={buttonText()}>Acessar</span>
            </Link>
          )}

          <Link to={"/"} className={button()}>
            <TvMinimal className={buttonIcon()} />
            <span className={buttonText()}>Home</span>
          </Link>

          <Link to={"/streaming"} className={button()}>
            <Airplay className={buttonIcon()} />
            <span className={buttonText()}>Streaming</span>
          </Link>

          {isAuthenticated && (
            <button className={button()} onClick={handleLogout}>
              <LogOut className={buttonIcon()} />
              <span className={buttonText()}>Desconectar</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
