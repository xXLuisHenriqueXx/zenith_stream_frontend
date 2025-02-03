import { tv } from "tailwind-variants";
import Container from "../../components/Container";
import { Link } from "react-router-dom";

const card = tv({
  slots: {
    container: "flex items-center justify-center w-full lg:w-[65%]",
    title: "text-4xl lg:text-6xl font-inter font-black text-white uppercase",
    subtitle: "text-lg lg:text-2xl text-white",
    description: "mt-4 text-center text-md lg:text-xl text-slate-400",
    button: "flex justify-center items-center w-full h-16 mt-8 bg-transparent hover:bg-blue-500 border-2 border-blue-500 rounded-sm text-white hover:text-slate-900 transition-all duration-200",
    buttonText: "font-oswald font-medium text-lg lg:text-xl uppercase"
  },
  variants: {
    container: {
      "primary": {
        container: "flex-col"
      },
      "second": {
        container: "flex-row mt-8 gap-4"
      }
    }
  }
});

const { container, title, subtitle, description, button, buttonText } = card();

function Home() {
  return (
    <Container screen="home">
      <section className={container({ container: "primary" })}>
        <p className={subtitle()}> Welcome to</p>
        <h1 className={title()}>Zenith Stream</h1>
        <p className={subtitle()}>a simple entertainment service</p>

        <p className={description()}>
          Here u can see what's on TV with our easy-to-navigate program grid,
          and explore a vast collection of streaming services, all in one place.
        </p>
      </section>

      <section className={container({ container: "second" })}>
        <Link to="/schedule" className={button()}>
          <p className={buttonText()}>Schedule</p>
        </Link>

        <Link to="/streaming" className={button()}>
          <p className={buttonText()}>Streaming</p>
        </Link>
      </section>
    </Container>
  );
}

export default Home;
