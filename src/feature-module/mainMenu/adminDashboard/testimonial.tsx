import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ReviewsData } from "../../../api/dashboardAPI";

function SampleNextArrow(props: any) {
  const { style, onClick } = props;

  return (
    <div
      className="slick-nav slick-nav-next class-slides"
      style={{ ...style, display: "flex", top: "-36%", left: "20%" }}
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
      style={{ ...style, display: "flex", top: "-36%", left: "17%" }}
      onClick={onClick}
    >
      <i className="fas fa-chevron-left" style={{ fontSize: "12px" }}></i>
    </div>
  );
}

interface ReviewsDataType {
  id: number;
  name: string;
  review: string;
}

const Testimonial = () => {
  const [reviews, setReviews] = useState<ReviewsDataType[]>([]);

  useEffect(() => {
    getReviews();
  }, []);

  const getReviews = async () => {
    const res = await ReviewsData();
    // console.log(reviews,"tanishq");
    if (res?.success) {
      // console.log("Data being set to state:tanishq", res.data);
      setReviews(res.data);
    }
  };
  const settings = {
    dots: false,
    autoplay: false,
    slidesToShow: 1,
    speed: 500,
    arrows: false
  };

  return (
    <div className="row flex-fill">
      <div className="bg-info p-3 br-5 text-center flex-fill mb-4 pb-0 owl-height bg-02">
        <h2 className="text-white mb-5">Testimonial</h2>
        <Slider {...settings} className="owl-carousel student-slider h-100">
          <div className="item h-100">
            <div className="d-flex justify-content-between flex-column h-100">
              <div>
                <h4 className="mb-3 text-white">Mujtaba Sayed</h4>{" "}
                <p className="text-light">
                  The training program and teaching methods by the instructor
                  (Yasmeen) are exceptional. Yasmeen as a person is so humble
                  and patient that you would simply enjoy all the sessions. She
                  understands each person's pain points and work accordingly to
                  fix them with rigours training and feedback. I haven't
                  attempted PTE prior, but the scores I achieved are mere hard
                  work of my humble trainer (Yasmeen S).
                </p>
              </div>
            </div>
          </div>
          <div className="item h-100">
            <div className="d-flex justify-content-between flex-column h-100">
              <div>
                <h4 className="mb-3 text-white">Mujtaba Sayed</h4>{" "}
                <p className="text-light">
                  The training program and teaching methods by the instructor
                  (Yasmeen) are exceptional. Yasmeen as a person is so humble
                  and patient that you would simply enjoy all the sessions. She
                  understands each person's pain points and work accordingly to
                  fix them with rigours training and feedback. I haven't
                  attempted PTE prior, but the scores I achieved are mere hard
                  work of my humble trainer (Yasmeen S).
                </p>
              </div>
            </div>
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default Testimonial;
