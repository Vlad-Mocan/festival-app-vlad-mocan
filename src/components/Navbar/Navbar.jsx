import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Navbar({ isDark }) {
  const user = useSelector((state) => state.auth.user);

  return (
    <header
      className={`${styles.header} ${isDark ? styles.light : styles.dark}`}
    >
      <nav className={styles.nav}>
        <Link className={styles.logo} to="/">
          fonem
        </Link>
        <ul className={styles.navList}>
          <li>
            <Link to="/lineup">LINEUP</Link>
          </li>
          <li>
            <Link to="/contact">CONTACT</Link>
          </li>
          <li>
            {user ? (
              <Link to="/profile" className={styles.username}>
                PROFILE
              </Link>
            ) : (
              <Link to="/login">SIGN IN</Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}
