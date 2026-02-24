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
      <div className={styles.blob1}></div>
      <div className={styles.blob2}></div>
      <div className={styles.blob3}></div>

      <div className={styles.authContainer}>
        <div className={styles.textContainer}>
          <span
            className={`${styles.logInText} ${isLogin ? styles.active : ""}`}
            onClick={() => setIsLogin(true)}
          >
            login
          </span>
          <span
            className={`${styles.registerText} ${isLogin ? "" : styles.active}`}
            onClick={() => setIsLogin(false)}
          >
            register
          </span>
        </div>

        <form onSubmit={handleSumbit} className={styles.authForm}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail"
            className={styles.email}
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className={styles.password}
          />
          <button type="submit" className={styles.submitBtn}>
            {loading ? "Loading..." : isLogin ? "Sign In" : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}
