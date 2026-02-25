import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { useEffect, useState } from "react";
import { setProfile, setUser } from "./store/authSlice";
import { supabase } from "./lib/supabase";
import { useDispatch } from "react-redux";
import Loader from "./components/Loader/Loader";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const isDark = location.pathname === "/" || location.pathname === "/login";
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        dispatch(setUser(user));
        supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single()
          .then(({ data: profile }) => {
            console.log("APP", profile);
            dispatch(setProfile(profile));
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    });
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }
  return (
    <>
      <Navbar isDark={isDark} />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
