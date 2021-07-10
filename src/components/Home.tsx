import { useContext } from "react";
import { AuthContext } from "../context/AuthContextProvider";

const Home = () => {
	const authContext = useContext(AuthContext)

  return (
    <section className="text-gray-600 body-font relative">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-12">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
            Welcome {authContext.username}
          </h1>
        </div>
      </div>
    </section>
  );
};

export default Home;
