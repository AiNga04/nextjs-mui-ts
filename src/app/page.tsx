import * as React from "react";
import { Container } from "@mui/material";
import AppMainSlider from "@/components/main/app.main.slider";
import AppMainSliderMusic from "@/components/main/app.main.music";
import { sendRequest } from "@/utils/api";

// Define categories as constants to avoid typos and enable reuse
const CATEGORIES = {
  CHILL: "CHILL",
  WORKOUT: "WORKOUT",
  PARTY: "PARTY",
} as const;

// Define the API URL as a constant
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

async function fetchTopTracks(category: string, limit: number = 10) {
  return sendRequest<IBackendRes<ITrackTop[]>>({
    url: `${API_URL}/api/v1/tracks/top`,
    method: "POST",
    body: {
      category,
      limit,
    },
  });
}

const HomePage = async () => {
  // Fetch all data in parallel for better performance
  const [chillData, workoutData, partyData] = await Promise.all([
    fetchTopTracks(CATEGORIES.CHILL),
    fetchTopTracks(CATEGORIES.WORKOUT),
    fetchTopTracks(CATEGORIES.PARTY),
  ]);

  // Extract data with fallback to empty array
  const chillTracks = chillData?.data ?? [];
  const workoutTracks = workoutData?.data ?? [];
  const partyTracks = partyData?.data ?? [];

  // Define section data to avoid repetition
  const sections = [
    { title: "Multiple tracks", data: chillTracks },
    { title: "Recently Played", data: workoutTracks },
    { title: "Introducing Buzzing", data: partyTracks },
    { title: "Trending Music", data: partyTracks },
    { title: "Chill", data: partyTracks },
  ];

  return (
    <Container maxWidth="lg" sx={{ padding: "0 0 100px 0 !important" }}>
      <AppMainSlider />

      {sections.map((section, index) => (
        <React.Fragment key={index}>
          <h2>{section.title}</h2>
          <AppMainSliderMusic data={section.data} />
        </React.Fragment>
      ))}
    </Container>
  );
};

export default HomePage;
