"use client";
import * as React from "react";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Chip, Button, Stack, Tooltip, Box } from "@mui/material";
import { ITracks } from "@/types/next-auth";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ModalViewTrack from "../../admin/tracks/modal/view.track";
import ModalDeleteTrack from "../../admin/tracks/modal/delete.track";
import ModalUpdateTrack from "../../admin/tracks/modal/update.track";

interface IProps {
  data: ITracks[];
  fetchTracks: () => void;
}

export default function TableTracks(props: IProps) {
  const { data, fetchTracks } = props;
  const [openModalView, setOpenModalView] = React.useState<boolean>(false);
  const [openModalDelete, setOpenModalDelete] = React.useState<boolean>(false);
  const [openModalUpdate, setOpenModalUpdate] = React.useState<boolean>(false);
  const [selectedTrack, setSelectedTrack] = React.useState<ITracks | undefined>(
    undefined
  );

  const handleCloseModalView = () => {
    setOpenModalView(false);
    setSelectedTrack(undefined);
  };

  const handleOpenModalView = (track: ITracks) => {
    setSelectedTrack(track);
    setOpenModalView(true);
  };

  const handleCloseModalDelete = () => {
    setOpenModalDelete(false);
    setSelectedTrack(undefined);
    fetchTracks();
  };

  const handleOpenModalDelete = (track: ITracks) => {
    setSelectedTrack(track);
    setOpenModalDelete(true);
  };

  const handleCloseModalUpdate = () => {
    setOpenModalUpdate(false);
    setSelectedTrack(undefined);
    fetchTracks();
  };

  const handleOpenModalUpdate = (track: ITracks) => {
    setSelectedTrack(track);
    setOpenModalUpdate(true);
  };

  const rows = data.map((track, index) => ({
    id: track._id,
    no: index + 1,
    title: track.title,
    description: track.description,
    category: track.category,
    imgUrl: track.imgUrl,
    trackUrl: track.trackUrl,
    countLike: track.countLike,
    countPlay: track.countPlay,
    uploader: track.uploader?.name || "Unknown",
    createdAt: track.createdAt,
    updatedAt: track.updatedAt,
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
      field: "title",
      headerName: "Title",
      width: 200,
      flex: 1,
    },
    {
      field: "category",
      headerName: "Category",
      width: 150,
      flex: 1,
    },
    {
      field: "countLike",
      headerName: "Likes",
      width: 100,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "countPlay",
      headerName: "Plays",
      width: 100,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "uploader",
      headerName: "Uploader",
      width: 150,
      flex: 1,
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
        const track = params.row as ITracks;
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
                  onClick={() => handleOpenModalView(track)}
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
                  onClick={() => handleOpenModalUpdate(track)}
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
                  onClick={() => handleOpenModalDelete(track)}
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

      <ModalViewTrack
        open={openModalView}
        handleClose={handleCloseModalView}
        track={selectedTrack}
      />
      <ModalDeleteTrack
        open={openModalDelete}
        handleClose={handleCloseModalDelete}
        track={selectedTrack}
        fetchTracks={fetchTracks}
      />
      <ModalUpdateTrack
        open={openModalUpdate}
        handleClose={handleCloseModalUpdate}
        track={selectedTrack}
        fetchTracks={fetchTracks}
      />
    </Box>
  );
}
