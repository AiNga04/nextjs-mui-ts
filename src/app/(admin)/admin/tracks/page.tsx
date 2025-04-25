"use client";
import * as React from "react";
import { ITracks, IUser } from "@/types/next-auth";
import { sendRequest } from "@/utils/api";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import "../../../../assets/styles/app.scss";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { ToastContainer } from "react-toastify";
import TableTracks from "../../components/table/track.table";
import ModalAddTrack from "./modal/add.track";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

interface IBackendResponse<T> {
  data?: {
    meta: {
      current: number;
      pageSize: number;
      pages: number;
      total: number;
    };
    result: T;
  };
  message?: string;
  statusCode?: number;
}

const TrackPage = () => {
  const { data: session } = useSession();
  const [tracks, setTracks] = useState<ITracks[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [openModalAddTrack, setOpenModalAddTrack] =
    React.useState<boolean>(false);

  const handleCloseModalAddTrack = () => {
    setOpenModalAddTrack(false);
  };

  const handleOpenModalAddTrack = () => {
    setOpenModalAddTrack(true);
  };

  async function fetchTracks() {
    if (!session?.access_token) return;

    setLoading(true);
    try {
      const res = await sendRequest<IBackendResponse<ITracks[]>>({
        url: `${API_URL}/api/v1/tracks`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.access_token}`,
        },
      });

      if (res?.data) {
        setTracks(res.data.result);
      }
    } catch (error) {
      console.error("Error fetching tracks:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (session?.access_token) {
      fetchTracks();
    }
  }, [session]);

  return (
    <Container maxWidth="lg">
      <Typography
        variant="h4"
        component="h1"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 0",
        }}
      >
        Manage Tracks
        <Box
          onClick={handleOpenModalAddTrack}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            cursor: "pointer",
            "&:hover": {
              opacity: 0.8,
            },
          }}
        >
          <PersonAddIcon fontSize="large" />
          <Typography>Add New Track</Typography>
        </Box>
      </Typography>

      <TableTracks data={tracks} fetchTracks={fetchTracks} />
      <ToastContainer />
      <ModalAddTrack
        open={openModalAddTrack}
        handleClose={handleCloseModalAddTrack}
        fetchTracks={fetchTracks}
      />
    </Container>
  );
};

export default TrackPage;
