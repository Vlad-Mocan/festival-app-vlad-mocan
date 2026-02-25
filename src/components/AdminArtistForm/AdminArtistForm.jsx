import { useState } from "react";
import { supabase } from "../../lib/supabase";
import styles from "./AdminArtistForm.module.css";

export default function AdminArtistForm({ onArtistAdded }) {
  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [stage, setStage] = useState("");
  const [day, setDay] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let image_url = "";

    if (image) {
      const fileName = `${Date.now()}-${image.name}`;
      const { error: uploadError } = await supabase.storage
        .from("artists")
        .upload(fileName, image);

      if (!uploadError) {
        const { data } = supabase.storage
          .from("artists")
          .getPublicUrl(fileName);
        image_url = data.publicUrl;
      }
    }

    const { error } = await supabase.from("artists").insert({
      name,
      genre,
      stage,
      day,
      time,
      description,
      image_url,
    });

    if (!error) {
      onArtistAdded();

      setName("");
      setGenre("");
      setStage("");
      setDay("");
      setTime("");
      setDescription("");
      setImage(null);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <p className={styles.paragraph}>Add New Artist Performance</p>
        <form onSubmit={handleSubmit} className={styles.artistForm}>
          <div className={styles.inputsContainer}>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name of artist"
            ></input>
            <input
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              placeholder="Genre of artist"
            ></input>
            <input
              value={stage}
              onChange={(e) => setStage(e.target.value)}
              placeholder="Stage of performance"
            ></input>
            <input
              value={day}
              onChange={(e) => setDay(e.target.value)}
              placeholder="Day of performance"
            ></input>
            <input
              value={time}
              onChange={(e) => setTime(e.target.value)}
              placeholder="Time of performance"
            ></input>
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description of artist"
            ></input>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className={styles.imgInput}
            ></input>
          </div>

          <button type="submit" className={styles.submitBtn}>
            Add
          </button>
        </form>
      </div>
    </>
  );
}
