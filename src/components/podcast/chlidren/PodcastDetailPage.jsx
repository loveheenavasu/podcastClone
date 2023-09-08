import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ControlPointOutlinedIcon from "@mui/icons-material/ControlPointOutlined";
import PlayCircleOutlinedIcon from "@mui/icons-material/PlayCircleOutlined";

const PodcastDetailPage = () => {
  const { id } = useParams();
  const audioRef = useRef(null);
  const [currentAudio, setCurrentAudio] = useState(null);

  const podcasts = useSelector((state) => state.podcasts);
  console.log(podcasts, "podcasts---podcasts");
  console.log(id, "id--id");

  const PosdcastData = podcasts.find((item) => item.id === parseInt(id));
  console.log(PosdcastData, "findata");
  const playAudio = (audioURL) => {
    if (currentAudio !== audioURL) {
      audioRef.current.src = audioURL;
      audioRef.current.play();
      setCurrentAudio(audioURL);
    } else {
      if (audioRef.current.paused) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  };

  if (!PosdcastData) {
    return <div>Loading...</div>;
  }

  console.log(PosdcastData?.audioURL, "PosdcastData?.audioURL");
  return (
    <Box sx={{ background: "hsl(0deg 0% 16.47%)" }}>
      <Box
        sx={{
          color: "#fff",
          display: "flex",
        }}
      >
        <Box sx={{ width: "40%" }}>
          <img src={PosdcastData.imgSRC} alt="" />
        </Box>
        <Box sx={{ display: "flex", width: "70%", flexDirection: "column" }}>
          <Box>
            <Typography variant="h1">{PosdcastData?.title}</Typography>
          </Box>
          <Box>
            <Button onClick={() => playAudio(PosdcastData.audioURL)}>
              <PlayCircleOutlinedIcon
                sx={{
                  background: "green",
                  color: "white",
                  borderRadius: "50%",
                  fontSize: "58px",
                }}
              />
            </Button>
            <Button>
              <ControlPointOutlinedIcon />
            </Button>
            <Button>
              <MoreHorizIcon />
            </Button>
          </Box>
          <Box>
            <Typography>Episode Description</Typography>
            <Typography>{PosdcastData.description}</Typography>
            <Button>See all Episodes</Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PodcastDetailPage;
