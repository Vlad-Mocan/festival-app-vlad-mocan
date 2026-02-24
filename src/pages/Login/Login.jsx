import styles from "./Login.module.css";
import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../store/authSlice";
import { Navigate } from "react-router-dom";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  if (user) return <Navigate to="/profile" />;

  const handleSumbit = async (e) => {
    e.preventDefault();

    setLoading(true);

    if (isLogin) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      if (error) console.log(error);
      else dispatch(setUser(data.user));
    } else {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });
      if (error) console.log(error);
      else dispatch(setUser(data.user));
    }

    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.authTabs}>
        <span
          className={`${styles.authTab} ${isLogin ? styles.active : ""}`}
          onClick={() => setIsLogin(true)}
        >
          Sign In
        </span>
        <span
          className={`${styles.authTab} ${!isLogin ? styles.active : ""}`}
          onClick={() => setIsLogin(false)}
        >
          Register
        </span>
      </div>

      <form onSubmit={handleSumbit} className={styles.authForm}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">
          {loading ? "Loading..." : isLogin ? "Sign In" : "Register"}
        </button>
      </form>
    </div>
  );
}
