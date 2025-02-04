import { tv } from "tailwind-variants";
import Navbar from "../Common/Navbar";

const card = tv({
  slots: {
    container: "min-w-full min-h-screen px-4 xl:px-12 2xl:px-24 bg-gradient-to-b from-gray-900 to-gray-950",
  },
  variants: {
    container: {
      default: {
        container: "flex flex-col justify-center items-center",
      },
      login: {
        container: "flex justify-center items-center",
      },
      home: {
        container: "flex flex-col justify-center items-center",
      },
    },
  },
});

const { container } = card();

interface Props {
  children: React.ReactNode;
  screen: "login" | "default" | "home";
}

function Container({ children, screen }: Props) {
  return (
    <main className={container({ container: screen })}>
      <Navbar />
      
      {children}
    </main>
  );
}

export default Container;
