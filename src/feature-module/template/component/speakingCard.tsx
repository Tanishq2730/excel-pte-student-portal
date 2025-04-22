import React from "react";
import { Link } from "react-router-dom";
import { all_routes } from "../../../feature-module/router/all_routes";

const SpeakingCard: React.FC = () => {
  const routes = all_routes;
  const speakingCards = [
    {
      id: 1,
      title: "1. Speaking Intro (unscored)",
      image: "assets/img/listening.png",
      link: routes.templateDetail,
    },
    {
      id: 2,
      title: "2. Describe image (line, bar, pie graphs)",
      image: "assets/img/listening.png",
      link: routes.templateDetail,
    },
    {
      id: 3,
      title: "3. Describe image (for images only)",
      image: "assets/img/listening.png",
      link: routes.templateDetail,
    },
    {
      id: 4,
      title: "4. Retell Lecture (version 1)",
      image: "assets/img/listening.png",
      link: routes.templateDetail,
    },
    {
      id: 5,
      title: "5. Answer Short Question",
      image: "assets/img/listening.png",
      link: routes.templateDetail,
    },
  ];
  return (
    <div className="speaking-card">
      <div className="row">
        {speakingCards.map((card) => (
          <div className="col-md-2">
            <div className="card" key={card.id}>
              <Link to={card.link}>
                <div className="cardIcon">
                  <img src={card.image} alt={card.title} />
                </div>
                <h5>{card.title}</h5>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpeakingCard;
