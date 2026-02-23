import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Navbar() {
  const user = useSelector((state) => state.auth.user);

  console.log(user);
  return user ? (
    <p>{user.email}</p>
  ) : (
    <Link to="/login">Login or Register</Link>
  );
}
