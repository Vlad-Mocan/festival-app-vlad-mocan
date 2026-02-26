import { useDispatch, useSelector } from "react-redux";
import styles from "./Profile.module.css";
import { Navigate } from "react-router-dom";
import { logout } from "../../store/authSlice";
import { supabase } from "../../lib/supabase";
import { useEffect, useState } from "react";
import ProfileArtistCard from "../../components/ProfileArtistCard/ProfileArtistCard";
import ProfileArtists from "../../components/ProfileArtists/ProfileArtists";

export default function Profile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const profile = useSelector((state) => state.auth.profile);

  const [myArtists, setMyArtists] = useState([]);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const savedIds = JSON.parse(localStorage.getItem("schedule")) || [];
        if (savedIds.length === 0) return;

        const numericIds = savedIds.map(Number);

        const { data, error } = await supabase.from("artists").select("*");

        if (error) throw error;
        setMyArtists(data.filter((a) => numericIds.includes(a.id)));
      } catch {
        console.error("Failed to fetch schedule");
      }
    };

    fetchSchedule();
  }, []);

  if (!user || !profile) return <Navigate to="/login" />;

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
          <span>YOUR</span>
          <span>PROFILE</span>
          {profile?.role === "admin" && (
            <span className={styles.profileSpan}> - ADMIN</span>
          )}
        </div>

        <div className={styles.profileDescription}>
          <span>E-mail: {user.email}</span>
          <span>First Name: {profile.first_name}</span>
          <span>Last Name: {profile.last_name}</span>
        </div>
      </div>

      <ProfileArtists artists={myArtists} />

      <button className={styles.signOutBtn} onClick={handleSignOut}>
        Sign Out
      </button>
    </section>
  );
}
