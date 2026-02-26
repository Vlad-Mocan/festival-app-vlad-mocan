import { useEffect, useState } from "react";
import styles from "./Messages.module.css";
import { supabase } from "../../lib/supabase";

export default function Messages({ setIsOpen }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expandedEntry, setExpandedEntry] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("messages")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        setMessages(data || []);
      } catch {
        console.error("Could not get contact messages");
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  console.log(messages);

  return (
    <div className={styles.overlay} onClick={() => setIsOpen(false)}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button onClick={() => setIsOpen(false)} className={styles.closeBtn}>
          X
        </button>

        {loading && <p>Loading messages...</p>}
        <div className={styles.messageCollection}>
          {messages.map((message) => (
            <div
              className={styles.messageEntry}
              onClick={() =>
                setExpandedEntry(
                  expandedEntry === message.id ? null : message.id,
                )
              }
            >
              <div key={message.id} className={styles.messageHeader}>
                <span>{message.email}</span>
                <span>{new Date(message.created_at).toLocaleDateString()}</span>
              </div>

              {expandedEntry === message.id && (
                <div className={styles.messageBody}>
                  <p>
                    <strong>Subject: {message.subject}</strong>
                  </p>
                  <p>Message: {message.message}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
