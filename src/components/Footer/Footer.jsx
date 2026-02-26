import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.container}>
      <Link to="/contact">
        <h2 className={styles.contactUsText}>CONTACT US &middot; 2026</h2>
      </Link>

      <div className={styles.footerContent}>
        <div className={styles.footerGrid}>
          <div className={styles.footerSection}>
            <h3>FESTIVAL INFO</h3>
            <ul>
              <li>June 18-21, 2026</li>
              <li>Timisoara, Romania</li>
            </ul>
          </div>

          <div className={styles.footerSection}>
            <h3>FOLLOW US</h3>
            <ul>
              <li>
                <a href="#">Instagram</a>
              </li>
              <li>
                <a href="#">Facebook</a>
              </li>
              <li>
                <a href="#">TikTok</a>
              </li>
              <li>
                <a href="#">Twitter</a>
              </li>
            </ul>
          </div>

          <div className={styles.footerSection}>
            <h3>QUICK LINKS</h3>
            <ul>
              <li>
                <Link to="/lineup">Lineup</Link>
              </li>
              <li>
                <a href="#">Tickets</a>
              </li>
              <li>
                <a href="#">FAQ</a>
              </li>
              <li>
                <a href="#">Venue Map</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
