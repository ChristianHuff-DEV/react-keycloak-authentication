import { useContext } from "react";
import { AuthContext } from "../context/AuthContextProvider";

const Home = () => {
  const authContext = useContext(AuthContext);

  return (
    <section className="text-gray-600 body-font relative">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center mb-12">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
            Welcome {authContext.username}
          </h1>
          {authContext.hasRole("user") && <p>You are a user</p>}
          {authContext.hasRole("admin") && <p>You are a admin</p>}
          <button
            className="text-white bg-red-400 border-0 py-2 px-8 focus:outline-none hover:bg-red-400 rounded text-lg mt-10"
            onClick={authContext.logout}
          >
            Logout
          </button>
        </div>
      </div>
    </section>
  );
};

export default Home;
