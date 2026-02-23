import styles from "./Lineup.module.css";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function Lineup() {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const { data, error } = await supabase.from("artists").select("*");
        if (error) throw new Error("Could not fetch artists");
        setArtists(data);
        console.log(data);
      } catch (error) {
        console.log("Error while fetching the artists");
      }
    };

    fetchArtists();
  }, []);

  return artists.map((artist) => <p key={artist.id}>{artist.name}</p>);
}
