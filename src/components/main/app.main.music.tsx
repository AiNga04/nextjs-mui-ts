"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Settings } from "react-slick";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Divider from "@mui/material/Divider";
import AppCardMusic from "../card/app.card.music";

interface IProps {
  data: ITrackTop[];
}

const AppMainSliderMusic = (props: IProps) => {
  const data = props.data;

  // Next Arrow button
  const NextArrow = (props: any) => {
    return (
      <Button
        variant="outlined"
        onClick={props.onClick}
        sx={{
          position: "absolute",
          right: 0,
          top: "48%",
          zIndex: 2,
          minWidth: 30,
          width: 35,
          color: "#000",
          backgroundColor: "#ffffff80",
          "&:hover": {
            backgroundColor: "#fff",
            color: "#000",
          },
          "&:focus": {
            backgroundColor: "#fff",
            color: "#000",
          },
        }}
      >
        <ChevronRightIcon />
      </Button>
    );
  };

  // Prev Arrow button
  const PrevArrow = (props: any) => {
    return (
      <Button
        variant="outlined"
        onClick={props.onClick}
        sx={{
          position: "absolute",
          top: "48%",
          zIndex: 2,
          minWidth: 30,
          width: 35,
          color: "#fff",
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            color: "#fff",
          },
          "&:focus": {
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            color: "#fff",
          },
        }}
      >
        <ChevronLeftIcon />
      </Button>
    );
  };

  // Slick Slider settings
  const settings: Settings = {
    dots: false,
    infinite: true,
    speed: 350,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Box
      sx={{
        ".item": {
          padding: "10px",
          display: "flex",
          justifyContent: "center", // Center the item inside slider
        },
      }}
    >
      <Slider {...settings}>
        {data.map((item) => (
          <div key={item._id} className="item">
            <AppCardMusic data={item} />
            <Divider sx={{ marginTop: "10px" }} />
          </div>
        ))}
      </Slider>
    </Box>
  );
};

export default AppMainSliderMusic;
