import { useState } from "react";
import styles from "./Contact.module.css";
import { supabase } from "../../lib/supabase";

const MAP_SRC =
  "https://maps.google.com/maps?q=Timisoara,Romania&t=&z=13&ie=UTF8&iwloc=&output=embed";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [submitMessage, setSubmitMessage] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = await supabase.from("messages").insert({
      name,
      email,
      subject,
      message,
    });

    if (!error) {
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");

      setSubmitMessage("Message submitted succesfully!");
    }
  };

  return (
    <div className={styles.contactPage}>
      <form className={styles.contactForm} onSubmit={handleSubmit}>
        <h2 className={styles.contactText}>CONTACT US</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />

        <textarea
          placeholder="Send Message"
          rows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>

        <button type="submit" className={styles.submitBtn}>
          Send Message
        </button>

        {!supabase && (
          <p className={styles.noSupabaseNotice}>
            No Supabase connection detected. Messages cannot be submitted
            without a valid .env file. See the README for setup instructions.
          </p>
        )}
        {submitMessage && <p>{submitMessage}</p>}
      </form>

      <div className={styles.mapContainer}>
        <iframe
          title="Map of Timisoara"
          width="100%"
          height="100%"
          style={{
            border: 0,
            boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
          }}
          src={MAP_SRC}
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
}