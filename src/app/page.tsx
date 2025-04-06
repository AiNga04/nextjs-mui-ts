import * as React from "react";
import AppMainSlider from "@/components/main/app.main.slider";
import AppMainSliderMusic from "@/components/main/app.main.music";
import { Container } from "@mui/material";
import { sendRequest } from "@/utils/api";

const HomePage = async () => {
  const chill = await sendRequest<IBackendRes<ITrackTop[]>>({
    url: "http://localhost:8000/api/v1/tracks/top",
    method: "POST",
    body: {
      category: "CHILL",
      limit: 10,
    },
  });
  const workout = await sendRequest<IBackendRes<ITrackTop[]>>({
    url: "http://localhost:8000/api/v1/tracks/top",
    method: "POST",
    body: {
      category: "WORKOUT",
      limit: 10,
    },
  });
  const party = await sendRequest<IBackendRes<ITrackTop[]>>({
    url: "http://localhost:8000/api/v1/tracks/top",
    method: "POST",
    body: {
      category: "PARTY",
      limit: 10,
    },
  });

  return (
    <Container maxWidth="lg" sx={{ padding: "0 0 100px 0 !important" }}>
      <AppMainSlider />
      <h2> Multiple tracks </h2>
      <AppMainSliderMusic data={chill?.data ?? []} />
      <h2> Recently Played </h2>
      <AppMainSliderMusic data={workout?.data ?? []} />
      <h2> Introducing Buzzing </h2>
      <AppMainSliderMusic data={party?.data ?? []} />
      <h2> Trending Music </h2>
      <AppMainSliderMusic data={party?.data ?? []} />
      <h2> Chill </h2>
      <AppMainSliderMusic data={party?.data ?? []} />
    </Container>
  );
};

export default HomePage;
