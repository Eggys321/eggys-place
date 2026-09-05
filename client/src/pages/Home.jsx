import Hero from "../features/home/Hero";
import Menu from "../features/home/Menu";
import UseTitle from "../Hooks/UseTitle";

const Home = () => {
  UseTitle(
    "Home",
    "Order fresh burgers, combos, chicken, chips, drinks and salads from Eggy's Place, with fast delivery to your door."
  );
  return (
    <>
      <main>
        <Hero />
        <Menu />
      </main>
    </>
  );
};

export default Home;
