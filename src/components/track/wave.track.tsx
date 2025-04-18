"use client";
import { useSearchParams } from "next/navigation";
import * as React from "react";
const { useCallback, useRef, useMemo, useState } = React;
import { useWavesurfer } from "@wavesurfer/react";
import "./wave.track.scss";
import LinearProgress from "@mui/material/LinearProgress";

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const secondsRemainder = Math.round(seconds) % 60;
  const paddedSeconds = `0${secondsRemainder}`.slice(-2);
  return `${minutes}:${paddedSeconds}`;
};

const WaveTrack = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const hoverRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const fileName = searchParams.get("audio");
  const [currentTime, setCurrentTime] = useState("0:00");
  const [duration, setDuration] = useState("0:00");

  const gradient = useMemo(() => {
    if (typeof window === "undefined") return undefined;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;

    const grad = ctx.createLinearGradient(0, 0, 0, 120);
    grad.addColorStop(0, "#ff5500");
    grad.addColorStop(1, "#ff9500");
    return grad;
  }, []);

  const { wavesurfer, isPlaying, isReady } = useWavesurfer({
    container: containerRef,
    height: 100,
    waveColor: gradient,
    progressColor: "rgba(200, 200, 200, 0.5)",
    cursorWidth: 1,
    cursorColor: "#333",
    barWidth: 2,
    barRadius: 1,
    url: fileName ? `/api?audio=${fileName}` : undefined,
    normalize: true,
    barAlign: "bottom",
    minPxPerSec: 50,
  });

  const onPlayPause = useCallback(() => {
    if (wavesurfer && isReady) {
      wavesurfer.playPause();
    }
  }, [wavesurfer, isReady]);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (hoverRef.current && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const offsetX = Math.max(
          0,
          Math.min(e.clientX - rect.left, rect.width)
        );
        hoverRef.current.style.width = `${offsetX}px`;
      }
    },
    []
  );

  React.useEffect(() => {
    if (!wavesurfer) return;

    const updateTime = (time: number) => setCurrentTime(formatTime(time));
    const updateDuration = (dur: number) => setDuration(formatTime(dur));

    wavesurfer.on("decode", updateDuration);
    wavesurfer.on("timeupdate", updateTime);

    return () => {
      // @ts-ignore -
      wavesurfer.un("decode");
      // @ts-ignore
      wavesurfer.un("timeupdate");
    };
  }, [wavesurfer]);

  return (
    <div className="wave-track-container">
      <div
        className="wavesurfer-container"
        ref={containerRef}
        onPointerMove={handlePointerMove}
        onClick={onPlayPause}
      >
        {!isReady && (
          <span className="loading-text">
            Loading...
            <LinearProgress />
          </span>
        )}
        <div className="wave-time">{currentTime}</div>
        <div className="wave-duration">{duration}</div>
        <div className="wave-hover" ref={hoverRef} />
      </div>
      <button
        onClick={onPlayPause}
        disabled={!isReady || !wavesurfer}
        className={`play-pause-btn ${isPlaying ? "playing" : ""}`}
      >
        {isPlaying ? "Pause" : "Play"}
      </button>
    </div>
  );
};

export default WaveTrack;
