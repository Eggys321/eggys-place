import errImg from "../assets/404.svg";
import { Link } from "react-router-dom";
import logo from "../assets/nav-logo.svg";
import UseTitle from "../Hooks/UseTitle";

const ErrorPage = () => {
  UseTitle("Page Not Found", "The page you're looking for doesn't exist.");

  return (
    <>
      <main className="wrapper flex justify-center items-center min-h-screen text-[#FFFFFF]">
        <div className="text-center">
          <div className="flex justify-center my-4">
            <img src={logo} alt="logo" />
          </div>
          <img src={errImg} alt="404 image" />
          <p className="py-6">
            Oops! Looks like you’ve wandered into the void.
          </p>
          <Link to="/" className="underline">
            Go back before things get weird
          </Link>
        </div>
      </main>
    </>
  );
};

export default ErrorPage;
