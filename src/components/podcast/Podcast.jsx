import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPodcasts } from "../../redux/podcastSlice";
import AudioPlayer from "./chlidren/AudioPlayer";

function Podcast() {
  const dispatch = useDispatch();
  const podcasts = useSelector((state) => state.podcasts);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/podcastData.json");

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        dispatch(setPodcasts(data));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  console.log(podcasts, "podcasts");
  return (
    <div
      style={{ background: "hsl(0deg 0% 16.47%)", color: "#fff", margin: 0 }}
    >
      <h1 style={{ textAlign: "center", padding: "30px" }}>Audio Player</h1>
      <AudioPlayer data={podcasts} />
    </div>
  );
}

export default Podcast;
