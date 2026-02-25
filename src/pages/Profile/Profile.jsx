import { useDispatch, useSelector } from "react-redux";
import styles from "./Profile.module.css";
import { Navigate } from "react-router-dom";
import { logout } from "../../store/authSlice";
import { supabase } from "../../lib/supabase";

export default function Profile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const profile = useSelector((state) => state.auth.profile);

  console.log("PROFILE", profile);
  if (!user || !profile) return <Navigate to="/login" />;

  console.log(profile);
  console.log(user);

  async function handleSignOut() {
    const { error } = await supabase.auth.signOut();
    if (error) console.error(error);
    else {
      dispatch(logout());
      <Navigate to="/login" />;
    }
  }

  return (
    <section className={styles.profile}>
      <div className={styles.blob1}></div>
      <div className={styles.blob2}></div>

      <div>
        <div className={styles.profileHeader}>
          <span className={styles.yourSpan}>YOUR</span>
          <span className={styles.profileSpan}>PROFILE</span>
        </div>

        <div className={styles.profileDescription}>
          <span>E-mail: {user.email}</span>
          <span>First Name: {profile.first_name}</span>
          <span>Last Name: {profile.last_name}</span>
        </div>
      </div>

      {/* <div className={styles.profileArtists}>
        <span>YOUR ARTISTS</span>
      </div> */}

      <button className={styles.signOutBtn} onClick={handleSignOut}>
        Sign Out
      </button>
    </section>
  );
}
