"use client";
import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import LinearWithValueLabel from "@/components/progress/progress";
import { InputImageFileUpload } from "@/components/button/upload.btn";
import { useSession } from "next-auth/react";
import axios from "axios";
import { toast } from "react-toastify";
import { redirect } from "next/navigation";

interface IFormData {
  title: string;
  description: string;
  category: string;
  imgUrl: string;
  trackUrl: string;
}

interface IProps {
  trackUpload: {
    fileName: string;
    percent: number;
    resFileName: string;
  };
}

const Step2 = (props: IProps) => {
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const [formData, setFormData] = useState<IFormData>({
    title: "",
    description: "",
    category: "",
    imgUrl: "",
    trackUrl: "",
  });
  const { trackUpload } = props;
  const [image, setImage] = useState<String>("");

  console.log(">>> check trackUpload: ", trackUpload);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      imgUrl: image as string,
      trackUrl: trackUpload.resFileName,
    }));
  }, [image, trackUpload]);

  console.log(">>> check trackUpload: ", trackUpload);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    console.log(">>> check formData: ", formData);
    setLoading(true);

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks`,
        {
          ...formData,
        },
        {
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          },
        }
      );
      console.log(">>> check audio: ", res.data.data.fileName);
      toast.success(res.data.message);
    } catch (error) {
      toast.error("Error uploading track");
    } finally {
      setLoading(false);
    }
    redirect("/");
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <Box mb={3}>
        <Typography variant="h6">{trackUpload.fileName}</Typography>
        <LinearWithValueLabel percentProps={trackUpload.percent} />
      </Box>

      <Row gutter={[16, 16]}>
        <Col xs={24} md={8}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "15px",
              alignItems: "center",
            }}
          >
            <Box
              component={image ? "img" : "div"}
              src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/images/${image}`}
              sx={{
                width: "250px",
                height: "250px",
                backgroundColor: "#ccc",
                borderRadius: "4px",
                objectFit: "cover",
              }}
              alt="Preview"
            />
            <InputImageFileUpload session={session} setImage={setImage} />
          </Box>
        </Col>

        {/* Form section */}
        <Col xs={24} md={16}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              width: "100%",
            }}
          >
            <TextField
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              variant="standard"
              required
              disabled={loading}
              fullWidth
              sx={{
                "& .MuiInput-root": {
                  width: "100%",
                },
              }}
            />
            <TextField
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              variant="standard"
              rows={3}
              multiline
              disabled={loading}
              fullWidth
              sx={{
                "& .MuiInput-root": {
                  width: "100%",
                },
              }}
            />
            <FormControl fullWidth disabled={loading} variant="standard">
              <InputLabel id="category-select-label">Category *</InputLabel>
              <Select
                labelId="category-select-label"
                name="category"
                value={formData.category}
                onChange={handleSelectChange}
                label="Category *"
                required
              >
                <MenuItem value="">Select Category</MenuItem>
                <MenuItem value="WORKOUT">Workout</MenuItem>
                <MenuItem value="PARTY">Party</MenuItem>
                <MenuItem value="CHILL">Chill</MenuItem>
              </Select>
            </FormControl>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                handleSubmit();
              }}
              disabled={loading}
            >
              Save
            </Button>
          </Box>
        </Col>
      </Row>
    </Box>
  );
};

export default Step2;
