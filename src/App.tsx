import AuthContextProvider from "./context/AuthContextProvider";
import LoadingSpinner from "./components/LoadingSpinner";

function App() {
  return (
    <AuthContextProvider>
      <LoadingSpinner />
    </AuthContextProvider>
  );
}

export default App;
