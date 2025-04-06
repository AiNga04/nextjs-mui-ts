"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Settings } from "react-slick";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ImageCarousel1 from "@/assets/images/carousel-1.jpg";
import ImageCarousel2 from "@/assets/images/carousel-2.jpg";
import ImageCarousel3 from "@/assets/images/carousel-3.jpg";
import ImageCarousel4 from "@/assets/images/carousel-4.jpg";
import ImageCarousel5 from "@/assets/images/carousel-5.jpg";
import ImageCarousel6 from "@/assets/images/carousel-6.jpg";

const AppMainSlider = () => {
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
        <ChevronLeftIcon />
      </Button>
    );
  };

  const settings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };
  return (
    <Box
      sx={{
        ".item": {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "10px",
          overflow: "hidden",
          padding: "10px !important",
          "& img": {
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "10px",
          },
        },

        width: "100%",
        padding: "20px 0 !important",
        borderRadius: "10px",
      }}
    >
      <Slider {...settings}>
        <div className="item">
          <img
            alt="carousel 1"
            src={ImageCarousel1.src}
            style={{ width: "100%", height: "450px" }}
          />
        </div>
        <div className="item">
          <img
            alt="carousel 2"
            src={ImageCarousel2.src}
            style={{ width: "100%", height: "450px" }}
          />
        </div>
        <div className="item">
          <img
            alt="carousel 3"
            src={ImageCarousel3.src}
            style={{ width: "100%", height: "450px" }}
          />
        </div>
        <div className="item">
          <img
            alt="carousel 4"
            src={ImageCarousel4.src}
            style={{ width: "100%", height: "450px" }}
          />
        </div>
        <div className="item">
          <img
            alt="carousel 5"
            src={ImageCarousel5.src}
            style={{ width: "100%", height: "450px" }}
          />
        </div>
        <div className="item">
          <img
            alt="carousel 6"
            src={ImageCarousel6.src}
            style={{ width: "100%", height: "450px" }}
          />
        </div>
      </Slider>
    </Box>
  );
};

export default AppMainSlider;
