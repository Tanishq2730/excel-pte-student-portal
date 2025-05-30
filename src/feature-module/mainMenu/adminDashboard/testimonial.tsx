import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ReviewsData } from "../../../api/dashboardAPI";

interface ArrowProps {
  style?: React.CSSProperties;
  onClick?: () => void;
}

const SampleNextArrow: React.FC<ArrowProps> = ({ style, onClick }) => (
  <div
    className="slick-nav slick-nav-next class-slides"
    style={{ 
      ...style, 
      display: "flex", 
      position: "absolute",
      top: "-36%", 
      left: "20%" 
    }}
    onClick={onClick}
    aria-label="Next slide"
  >
    <i className="fas fa-chevron-right" style={{ fontSize: "12px" }}></i>
  </div>
);

const SamplePrevArrow: React.FC<ArrowProps> = ({ style, onClick }) => (
  <div
    className="slick-nav slick-nav-prev class-slides"
    style={{ 
      ...style, 
      display: "flex", 
      position: "absolute",
      top: "-36%", 
      left: "17%" 
    }}
    onClick={onClick}
    aria-label="Previous slide"
  >
    <i className="fas fa-chevron-left" style={{ fontSize: "12px" }}></i>
  </div>
);

interface ReviewsDataType {
  id: number;
  name: string;
  review_content: string;
}

const sliderSettings = {
  dots: false,
  autoplay: true,
  infinite: true,
  slidesToShow: 1,
  speed: 500,
  arrows: false,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        arrows: false,
      }
    }
  ]
};

const Testimonial: React.FC = () => {
  const [reviews, setReviews] = useState<ReviewsDataType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getReviews = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const res = await ReviewsData();
        
        if (res?.success && Array.isArray(res.data)) {
          setReviews(res.data);
        } else {
          setError('Failed to load reviews. Please try again later.');
          console.error('Invalid response format:', res);
        }
      } catch (error) {
        setError('Error loading reviews. Please try again later.');
        console.error('Error fetching reviews:', error);
      } finally {
        setIsLoading(false);
      }
    };

    getReviews();
  }, []);

  if (isLoading) {
    return (
      <div className="bg-info p-3 br-5 text-center flex-fill mb-4 pb-0 owl-height bg-02">
        <h2 className="text-white mb-5">Testimonial</h2>
        <div className="text-white">Loading testimonials...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-info p-3 br-5 text-center flex-fill mb-4 pb-0 owl-height bg-02">
        <h2 className="text-white mb-5">Testimonial</h2>
        <div className="text-white">{error}</div>
      </div>
    );
  }

  if (!reviews || reviews.length === 0) {
    return (
      <div className="bg-info p-3 br-5 text-center flex-fill mb-4 pb-0 owl-height bg-02">
        <h2 className="text-white mb-5">Testimonial</h2>
        <div className="text-white">No testimonials available.</div>
      </div>
    );
  }

  return (
    <div className="bg-info p-3 br-5 text-center flex-fill mb-4 pb-0 owl-height bg-02">
      <h2 className="text-white mb-5">Testimonial</h2>
      <Slider {...sliderSettings} className="owl-carousel student-slider h-100">
        {reviews.map((review) => (
          <div className="item h-100" key={review.id}>
            <div className="d-flex justify-content-between flex-column h-100">
              <div>
                <h4 className="mb-3 text-white">{review.name}</h4>
                <p className="text-light">{review.review_content}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Testimonial;
