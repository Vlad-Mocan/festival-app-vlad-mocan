import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { useEffect } from "react";
import { setUser } from "./store/authSlice";
import { supabase } from "./lib/supabase";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) dispatch(setUser(user));
    });
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
