// import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/react";
import { Navigate, Route, Routes } from "react-router";
import { useAuth } from "@clerk/react";
import { useAuthStore } from "./store/useAuthStore";
import ChatPage from "./pages/ChatPage";
import AuthPage from "./pages/AuthPage";
import PageLoader from "./components/PageLoader";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

function App() {
  const { isSignedIn, isLoaded } = useAuth();

  //option 1
  // const {clearAuth, checkAuth, isCheckingAuth} = useAuthStore();

  //option 2 (better for performance)
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const checkAuth = useAuthStore((state) => state.checkAuth);
  const isCheckingAuth = useAuthStore((state) => state.isCheckingAuth);

  useEffect(() => {
    if (!isLoaded) return;

    if (!isSignedIn) checkAuth();
    else clearAuth();
  }, [checkAuth, isLoaded, isSignedIn, clearAuth]);

  if (!isLoaded || (isSignedIn && isCheckingAuth)) {
    return <PageLoader />;
  }
  return (
    <>
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
      <Toaster />
    </>
  );
}

export default App;
