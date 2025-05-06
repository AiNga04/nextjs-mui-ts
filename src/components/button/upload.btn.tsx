import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { toast } from "react-toastify";
import axios from "axios";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

function InputAudioFileUpload() {
  return (
    <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
    >
      Upload files
      <VisuallyHiddenInput
        type="file"
        onChange={(event) => console.log(event.target.files)}
        multiple
      />
    </Button>
  );
}

const InputImageFileUpload = (props: any) => {
  const { session, setImage } = props;
  return (
    <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
    >
      Upload files
      <VisuallyHiddenInput
        type="file"
        onChange={async (event) => {
          const files = event.target.files;

          if (files && files[0]) {
            const newImage = new FormData();
            newImage.append("fileUpload", files[0]);

            try {
              const res = await axios.post(
                "http://localhost:8000/api/v1/files/upload",
                newImage,
                {
                  headers: {
                    Authorization: `Bearer ${session?.access_token}`,
                    target_type: "images",
                  },
                }
              );
              setImage(res.data.data.fileName);
            } catch (error) {
              //@ts-ignore
              toast.error(error?.response?.data?.message);
            }
          }
        }}
        multiple
      />
    </Button>
  );
};

export { InputAudioFileUpload, InputImageFileUpload };
