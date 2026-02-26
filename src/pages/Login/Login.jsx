import styles from "./Login.module.css";
import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { useDispatch, useSelector } from "react-redux";
import { setProfile, setUser } from "../../store/authSlice";
import { Navigate } from "react-router-dom";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
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
      else {
        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", data.user.id)
          .single();

        dispatch(setUser(data.user));
        dispatch(setProfile(profile));
      }
    } else {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { first_name: firstName, last_name: lastName },
        },
      });

      if (!error && data.session) {
        const profile = {
          id: data.user.id,
          first_name: firstName,
          last_name: lastName,
          role: "user",
        };

        console.log(data.user.id);
        console.log(data);

        await supabase.from("profiles").insert(profile);

        dispatch(setUser(data.user));
        dispatch(setProfile(profile));
      } else {
        console.log(error);
      }
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
          {isLogin || (
            <>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
                className={styles.input}
              />
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
                className={styles.input}
              />
            </>
          )}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail"
            className={styles.input}
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className={styles.input}
          />

          <button type="submit" className={styles.submitBtn}>
            {loading ? "Loading..." : isLogin ? "Sign In" : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}
