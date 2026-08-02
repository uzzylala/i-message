// import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/react";
import { Navigate, Route, Routes } from "react-router";
import { useAuth } from "@clerk/react";
import ChatPage from "./pages/ChatPage";
import AuthPage from "./pages/AuthPage";
import PageLoader from "./components/PageLoader";

function App() {
  const { isSignedIn, isLoaded } = useAuth();
  if (!isLoaded) {
    return <PageLoader />;
  }
  return (
    <Routes>
      <Route
        path="/"
        element={isSignedIn ? <ChatPage /> : <Navigate to="/auth" replace />}
      />
      <Route
        path="/auth"
        element={!isSignedIn ? <AuthPage /> : <Navigate to="/" replace />}
      />
    </Routes>
  );
}

export default App;
