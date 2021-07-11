import { useContext } from "react";
import { AuthContext } from "./context/AuthContextProvider";
import LoadingSpinner from "./components/LoadingSpinner";
import Home from "./components/Home";

function App() {
  const authContext = useContext(AuthContext);

  // Show the loading spinner while the user is not authenticated
  if (!authContext.isAuthenticated) {
    return <LoadingSpinner />;
  }
  // If the user is authenticated display the home component
  else {
    return <Home />;
  }
}

export default App;
