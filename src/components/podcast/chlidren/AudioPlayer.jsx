import React, { useRef, useState } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import "../style.css";
import Typography from "@mui/material/Typography";
import { Box, Button } from "@mui/material";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import { Link } from "react-router-dom";

import UndoOutlinedIcon from "@mui/icons-material/UndoOutlined";
import RedoOutlinedIcon from "@mui/icons-material/RedoOutlined";

const AudioPlayer = ({ data }) => {
  const audioRef = useRef(null);
  const [currentAudio, setCurrentAudio] = useState(null);

  const [hoveredCardIndex, setHoveredCardIndex] = useState(null);
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

  const fixedAudioPlayerStyle = {
    position: "fixed",
    bottom: "0",
    width: "100%",
    zIndex: "1000",
    backgroundColor: "#333",
    padding: "10px",
  };
  const audioStyle = {
    width: "91%",
    borderRadius: "4px",
    padding: "10px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  };
  const skipAhead = () => {
    if (audioRef.current) {
      audioRef.current.currentTime += 10;
    }
  };

  const skipBack = () => {
    if (audioRef.current) {
      audioRef.current.currentTime -= 10;
    }
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          width: "100vw",
          gap: "30px",
          paddingBottom: "150px",
        }}
      >
        {data.map((item, index) => {
          return (
            <>
              {/* <Link to={`/podcast/${item.id}`} key={item.id}> */}
              <Card
                sx={{
                  maxWidth: 320,
                  background: "#3c3e3c73",
                  padding: "20px",
                  borderRadius: "10px",
                  transition: "background-color 0.3s ease",
                  position: "relative",
                  "&:hover": {
                    background: "#444",
                  },
                }}
                key={item.id}
                className="audio-card"
                onMouseEnter={() => setHoveredCardIndex(index)}
                onMouseLeave={() => setHoveredCardIndex(null)}
              >
                <CardMedia
                  component="img"
                  height="194"
                  width="300"
                  image={item.imgSRC}
                  alt={item.title}
                  sx={{
                    "&:hover": {
                      transform: "scale(1.1)",
                      transition: "transform 0.2s",
                      boxShadow:
                        "rgba(0, 0, 0, 0.35) 0px -50px 36px -28px inset",
                    },
                  }}
                />
                <CardContent>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ color: "#fff" }}
                  >
                    {item.title}
                  </Typography>
                </CardContent>

                <div
                  style={{
                    position: "absolute",
                    left: "68%",
                    bottom: "0%",
                    zIndex: 1,

                    transform: `translateY( ${
                      hoveredCardIndex === index ? "-48px" : "100%"
                    })`,
                    transition: "transform 0.3s ease",
                  }}
                >
                  <Button
                    variant="text"
                    style={{
                      border: "none",
                      cursor: "pointer",
                      display: "block",
                      opacity: hoveredCardIndex === index ? 1 : 0,

                      transition: "opacity 0.3s ease, transform 0.3s ease",
                    }}
                    className="hover-button"
                    onClick={() => playAudio(item.audioURL)}
                  >
                    <PlayCircleFilledIcon
                      sx={{
                        color: "#ef0a87",
                        fontSize: "43px",
                        background: "#fff",
                        borderRadius: "50%",
                        "&:hover": {
                          color: "#e3288ec4",
                        },
                      }}
                    />
                  </Button>
                </div>

              </Card>
              {/* </Link> */}
            </>
          );
        })}
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "fixed",
          bottom: "0",
          width: "100%",
          zIndex: "1000",
          backgroundColor: "#333",
          padding: "10px",
        }}
      >
        <Box
          sx={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <audio
            ref={audioRef}
            controls
            preload="auto"
            type="audio/mp3"
            style={audioStyle}
          />
          <Box>
            {" "}
            <Button
              onClick={skipBack}
              sx={{ position: "absolute", zIndex: 1, left: "2px", top: "10px" }}
            >
              <Box>
                <UndoOutlinedIcon sx={{ color: "#fff" }} />
                <Typography sx={{ m: 0, fontSize: "10px", color: "#fff" }}>
                  10s
                </Typography>
              </Box>
            </Button>
            <Button
              onClick={skipAhead}
              sx={{
                position: "absolute",
                zIndex: 1,
                right: "2px",
                top: "10px",
              }}
            >
              <Box>
                <RedoOutlinedIcon sx={{ color: "#fff" }} />
                <Typography sx={{ m: 0, fontSize: "10px", color: "#fff" }}>
                  10s
                </Typography>
              </Box>
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default AudioPlayer;
