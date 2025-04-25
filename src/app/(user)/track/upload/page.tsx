import UploadTabs from "@/components/track/upload.tabs";
import { Container } from "@mui/material";
import { ToastContainer } from "react-toastify";

const UploadPage = () => {
  return (
    <Container maxWidth="lg">
      <UploadTabs />
      <ToastContainer />
    </Container>
  );
};

export default UploadPage;
