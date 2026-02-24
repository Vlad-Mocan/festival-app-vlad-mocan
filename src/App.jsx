import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { useEffect } from "react";
import { setUser } from "./store/authSlice";
import { supabase } from "./lib/supabase";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const isDark = location.pathname === "/";

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) dispatch(setUser(user));
    });
  }, [dispatch]);

  return (
    <>
      <Navbar isDark={isDark} />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
