"use client";
import * as React from "react";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Chip, Button, Stack, Tooltip, Box } from "@mui/material";
import { IUser } from "@/types/next-auth";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ModalViewUser from "../../admin/users/modals/view.user";
import DeleteUserModal from "../../admin/users/modals/delete.user";
import ModalUpdateUser from "../../admin/users/modals/update.user";
interface IProps {
  data: IUser[];
  fetchUsers: () => void;
}

export default function TableUser(props: IProps) {
  const { data } = props;
  const [openModalView, setOpenModalView] = React.useState<boolean>(false);
  const [openModalDelete, setOpenModalDelete] = React.useState<boolean>(false);
  const [openModalUpdateUser, setOpenModalUpdateUser] =
    React.useState<boolean>(false);
  const [selectedUser, setSelectedUser] = React.useState<IUser | undefined>(
    undefined
  );
  const fetchUsers = props.fetchUsers;

  const handleCloseModalView = () => {
    setOpenModalView(false);
    setSelectedUser(undefined);
  };

  const handleOpenModalView = (user: IUser) => {
    setSelectedUser(user);
    setOpenModalView(true);
  };

  const handleCloseModalDelete = () => {
    setOpenModalDelete(false);
    setSelectedUser(undefined);
    fetchUsers();
  };

  const handleCloseModalUpdateUser = () => {
    setOpenModalUpdateUser(false);
    setSelectedUser(undefined);
    fetchUsers();
  };

  const handleOpenModalDelete = (user: IUser) => {
    console.log("Delete user:", user);
    setSelectedUser(user);
    setOpenModalDelete(true);
  };

  const handleOpenModalUpdateUser = (user: IUser) => {
    console.log("Update user:", user);
    setSelectedUser(user);
    setOpenModalUpdateUser(true);
  };

  // Add index to each row for the "No" column
  const rows = data.map((user, index) => ({
    id: user._id,
    no: index + 1,
    name: user.name,
    username: user.username,
    email: user.email,
    address: user.address,
    role: user.role,
    gender: user.gender,
    age: user.age,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  }));

  const columns: GridColDef[] = [
    {
      field: "no",
      headerName: "No",
      width: 70,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "name",
      headerName: "Name",
      width: 200,
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      width: 250,
      flex: 1,
    },
    {
      field: "address",
      headerName: "Address",
      width: 250,
      flex: 1,
    },
    {
      field: "role",
      headerName: "Role",
      width: 120,
      align: "center",
      headerAlign: "center",
      renderCell: (params: GridRenderCellParams) => {
        return (
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Chip
              label={params.value as string}
              color={params.value === "ADMIN" ? "primary" : "default"}
              variant="outlined"
              size="small"
            />
          </Box>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 180,
      sortable: false,
      filterable: false,
      align: "center",
      headerAlign: "center",
      renderCell: (params: GridRenderCellParams) => {
        const user = params.row as IUser;
        return (
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Stack
              direction="row"
              spacing={1}
              justifyContent="center"
              alignItems="center"
            >
              <Tooltip title="View">
                <Button
                  size="small"
                  variant="outlined"
                  color="info"
                  onClick={() => handleOpenModalView(user)}
                  sx={{
                    minWidth: "40px",
                    width: "40px",
                    height: "25px",
                    padding: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <VisibilityIcon fontSize="small" />
                </Button>
              </Tooltip>
              <Tooltip title="Edit">
                <Button
                  size="small"
                  variant="outlined"
                  color="primary"
                  onClick={() => handleOpenModalUpdateUser(user)}
                  sx={{
                    minWidth: "40px",
                    width: "40px",
                    height: "25px",
                    padding: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <EditIcon fontSize="small" />
                </Button>
              </Tooltip>
              <Tooltip title="Delete">
                <Button
                  size="small"
                  variant="outlined"
                  color="error"
                  onClick={() => handleOpenModalDelete(user)}
                  sx={{
                    minWidth: "40px",
                    width: "40px",
                    height: "25px",
                    padding: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </Button>
              </Tooltip>
            </Stack>
          </Box>
        );
      },
    },
  ];

  return (
    <Box
      style={{
        height: 600,
        width: "100%",
        backgroundColor: "white",
        borderRadius: "8px",
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[10, 25, 50, 100]}
        checkboxSelection
        disableRowSelectionOnClick
        getRowClassName={() => "data-grid-row"}
        sx={{
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#f5f5f5",
            borderRadius: "8px 8px 0 0",
          },
          "& .data-grid-row:nth-of-type(odd)": {
            backgroundColor: "#fafafa",
          },
          "& .MuiDataGrid-cell:focus": {
            outline: "none",
          },
          "& .MuiDataGrid-cell": {
            display: "flex",
            alignItems: "center",
          },
          border: "none",
          borderRadius: "8px",
          "& .MuiDataGrid-footerContainer": {
            borderTop: "1px solid #e0e0e0",
            backgroundColor: "#f5f5f5",
            borderRadius: "0 0 8px 8px",
          },
        }}
      />

      <ModalViewUser
        open={openModalView}
        handleClose={handleCloseModalView}
        user={selectedUser}
      />

      <DeleteUserModal
        open={openModalDelete}
        handleClose={handleCloseModalDelete}
        user={selectedUser}
      />
      <ModalUpdateUser
        open={openModalUpdateUser}
        handleClose={handleCloseModalUpdateUser}
        user={selectedUser}
      />
    </Box>
  );
}
