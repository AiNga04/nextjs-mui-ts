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
          right: { xs: "5px", md: "0" }, // Giảm khoảng cách trên mobile
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 2,
          minWidth: { xs: 25, md: 35 }, // Nút nhỏ hơn trên mobile
          width: { xs: 25, md: 35 },
          height: { xs: 25, md: 35 },
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
        <ChevronRightIcon fontSize="small" />
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
          left: { xs: "5px", md: "0" }, // Giảm khoảng cách trên mobile
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 2,
          minWidth: { xs: 25, md: 35 }, // Nút nhỏ hơn trên mobile
          width: { xs: 25, md: 35 },
          height: { xs: 25, md: 35 },
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
        <ChevronLeftIcon fontSize="small" />
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
          padding: { xs: "5px !important", md: "10px !important" }, // Giảm padding trên mobile
          "& img": {
            width: "100%",
            height: { xs: "250px", sm: "350px", md: "450px" }, // Chiều cao linh hoạt theo kích thước màn hình
            objectFit: "cover",
            borderRadius: "10px",
          },
        },
        width: "100%",
        padding: { xs: "10px 0 !important", md: "20px 0 !important" }, // Giảm padding tổng thể trên mobile
        borderRadius: "10px",
      }}
    >
      <Slider {...settings}>
        <div className="item">
          <img alt="carousel 1" src={ImageCarousel1.src} />
        </div>
        <div className="item">
          <img alt="carousel 2" src={ImageCarousel2.src} />
        </div>
        <div className="item">
          <img alt="carousel 3" src={ImageCarousel3.src} />
        </div>
        <div className="item">
          <img alt="carousel 4" src={ImageCarousel4.src} />
        </div>
        <div className="item">
          <img alt="carousel 5" src={ImageCarousel5.src} />
        </div>
        <div className="item">
          <img alt="carousel 6" src={ImageCarousel6.src} />
        </div>
      </Slider>
    </Box>
  );
};

export default AppMainSlider;
