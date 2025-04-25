"use client";
import * as React from "react";
import { IUser } from "@/types/next-auth";
import { sendRequest } from "@/utils/api";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import TableUser from "../../components/table/user.table";
import { Box, Container, Typography } from "@mui/material";
import "../../../../assets/styles/app.scss";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { toast, ToastContainer } from "react-toastify";
import ModalAddUser from "./modals/add.user";

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

const UsersPage = () => {
  const { data: session } = useSession();
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [openModalAddUser, setOpenModalAddUser] =
    React.useState<boolean>(false);

  const handleCloseModalAddUser = () => {
    setOpenModalAddUser(false);
  };

  const handleOpenModalAddUser = () => {
    setOpenModalAddUser(true);
  };

  async function fetchUsers() {
    if (!session?.access_token) return;

    setLoading(true);
    try {
      const res = await sendRequest<IBackendResponse<IUser[]>>({
        url: `${API_URL}/api/v1/users/all`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.access_token}`,
        },
      });

      if (res?.data) {
        setUsers(res.data.result);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (session?.access_token) {
      fetchUsers();
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
        Manage Users
        <Box
          onClick={handleOpenModalAddUser}
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
          <Typography>Add New User</Typography>
        </Box>
      </Typography>

      <TableUser data={users} fetchUsers={fetchUsers} />
      <ToastContainer />
      <ModalAddUser
        open={openModalAddUser}
        handleClose={handleCloseModalAddUser}
      />
    </Container>
  );
};

export default UsersPage;
