import { Link } from "react-router-dom";
import { tv } from "tailwind-variants";

import Container from "../../components/Common/Container";

const card = tv({
  slots: {
    containerNotFound: "flex flex-col items-center justify-center w-full h-screen",
    title: "text-9xl font-oswald font-black text-white text-center p-4 border-6 border-slate-800 rounded-t-4xl",
    subtitle: "text-sm lg:text-base font-inter text-white text-center pt-4",
    button: "flex justify-center items-center px-8 h-16 mt-12 bg-transparent hover:bg-blue-500 border-2 border-blue-500 rounded-sm text-white hover:text-slate-900 transition-all duration-200",
    buttonText: "font-oswald font-medium text-lg lg:text-xl uppercase",
  },
});

const { containerNotFound, title, subtitle, button, buttonText } = card();

function NotFound() {
  return (
    <Container screen="default">
      <section className={containerNotFound()}>
        <h1 className={title()}>404</h1>
        <h1 className={subtitle()}>
          Oops, it appears that the page you tried to access does not exist on our system
        </h1>

        <Link to="/" className={button()}>
          <p className={buttonText()}>Return to home</p>
        </Link>
      </section>
    </Container>
  );
}

export default NotFound;
