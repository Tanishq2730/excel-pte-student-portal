import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {  DashboardVideo } from "../../../api/dashboardAPI";

interface DashboardVideoType {
  id: number;
  title: string;
  description: string;
  image: string;
}
function SampleNextArrow(props: any) {
  const { style, onClick } = props;

  return (
    <div
      className="slick-nav slick-nav-next class-slides"
      style={{ ...style, display: "flex", top: "-40%", left: "30%" }}
      onClick={onClick}
    >
      <i className="fas fa-chevron-right" style={{ fontSize: "12px" }}></i>
    </div>
  );
}

function SamplePrevArrow(props: any) {
  const { style, onClick } = props;
  return (
    <div
      className="slick-nav slick-nav-prev class-slides"
      style={{ ...style, display: "flex", top: "-40%", left: "25%" }}
      onClick={onClick}
    >
      <i className="fas fa-chevron-left" style={{ fontSize: "12px" }}></i>
    </div>
  );
}

const PteVideoSlider = () => {
  const [video, setVideo] = useState<DashboardVideoType[]>([]);

  useEffect(() => {
    videoCount();
  }, []);

  const videoCount = async () => {
    const res = await DashboardVideo();
    // console.log(video);
    if (res?.success) {
      // console.log("Data being set to state:tanishq", res.data);
      setVideo(res.data);
    }
  };
  const settings = {
    dots: false,
    autoplay: false,
    slidesToShow: 3,
    margin: 24,
    speed: 500,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 776,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 567,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="col-xxl-12 col-xl-12 col-md-12">
      <div className="card">
        <div className="card-header d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <h4 className="me-2">PTE Video Guide</h4>
            <div className="owl-nav slide-nav2 text-end nav-control" />
          </div>
          <div className="d-inline-flex align-items-center class-datepick">
            <button className="btn btn-primary">View All</button>
          </div>
        </div>
        <div className="card-body videoSlider">
          <Slider {...settings} className="owl-carousel owl-theme task-slider">
            <div className="item">
              <div className="bg-light-400 rounded p-2">
                <img className="classImg" src="assets/img/slider1.png" alt="Speaking" />
                <p className="text-dark mt-1">Speaking</p>
              </div>
            </div>
            <div className="item">
              <div className="bg-light-400 rounded p-2">
                <img className="classImg" src="assets/img/slider2.png" alt="Writing" />
                <p className="text-dark mt-1">Writing</p>
              </div>
            </div>
            <div className="item">
              <div className="bg-light-400 rounded p-2">
                <img className="classImg" src="assets/img/slider1.png" alt="Reading" />
                <p className="text-dark mt-1">Reading</p>
              </div>
            </div>
            <div className="item">
              <div className="bg-light-400 rounded p-2">
                <img className="classImg" src="assets/img/slider1.png" alt="Listening" />
                <p className="text-dark mt-1">Listening</p>
              </div>
            </div>
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default PteVideoSlider;
