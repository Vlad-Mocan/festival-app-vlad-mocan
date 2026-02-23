import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Navbar() {
  const user = useSelector((state) => state.auth.user);

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link className={styles.logo} to="/">
          fonem
        </Link>
        <ul className={styles.navList}>
          <li>
            <Link to="/lineup">LINEUP</Link>
          </li>
          <li>
            {user ? (
              <span className={styles.username}>
                {user.email.split("@")[0]}
              </span>
            ) : (
              <Link to="/login">SIGN IN</Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}
