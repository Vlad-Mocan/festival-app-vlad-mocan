import { useDispatch, useSelector } from "react-redux";
import styles from "./Profile.module.css";
import { Navigate } from "react-router-dom";
import { logout } from "../../store/authSlice";
import { supabase } from "../../lib/supabase";

export default function Profile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  if (!user) return <Navigate to="/login" />;

  async function handleSignOut() {
    const { error } = await supabase.auth.signOut();
    if (error) console.error(error);
    else {
      dispatch(logout());
      <Navigate to="/login" />;
    }
  }

  return (
    <div className={styles.container}>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
}
