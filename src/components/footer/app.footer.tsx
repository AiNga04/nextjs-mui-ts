"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import { Container } from "@mui/material";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { useHasMounted } from "@/utils/custom.hook";

const Player = () => (
  <AudioPlayer
    src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3"
    volume={0.5}
    onPlay={(e) => console.log("onPlay")}
    style={{
      boxShadow: "unset",
      background: "transparent",
      width: "70%",
    }}
  />
);

export default function AppFooter() {
  const hasMounted = useHasMounted();

  if (!hasMounted) {
    return <></>;
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar
        position="fixed"
        color="secondary"
        sx={{ top: "auto", bottom: 0, background: "#f2f2f2" }}
      >
        <Toolbar>
          <Container
            maxWidth="lg"
            sx={{
              padding: "0px !important",
              display: "flex",
              gap: "20px",
            }}
          >
            <Player />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                justifyContent: "center",
                minWidth: "100",
                width: "30%",
              }}
            >
              <div style={{ color: "#ccc" }}>Song Title</div>
              <div style={{ color: "#000" }}>Artist Name</div>
            </div>
          </Container>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
