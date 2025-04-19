import React, { useState } from "react";

interface Question {
  id: number;
  title: string;
  text: string;
}

const questions: Question[] = [
  {
    id: 1,
    title: "Transformative Power",
    text: "In today's world, cinema and television have become an integral part of our lives, impacting us in various profound ways. From entertainment and education to cultural expression, they hold immense significance.\n\nCinema and television offer a window into different cultures and realities. Through films and TV shows, we can explore diverse perspectives, lifestyles, and experiences. This exposure fosters empathy and a broader worldview, helping break down stereotypes and prejudices.\n\nFurthermore, these media platforms have the power to educate. Documentary films and educational programs provide valuable insights into historical events, scientific discoveries, and social issues. They make complex subjects accessible and engage audiences of all ages.\n\nCinema and television are also powerful tools for cultural expression. Filmmakers and TV creators use their work to address societal concerns, challenge norms, and promote change. Iconic movies like 'To Kill a Mockingbird' and TV series like 'The Handmaid's Tale' have sparked crucial conversations about injustice and inequality.\n\nEntertainment remains at the heart of these media. They offer escapism, relaxation, and joy. Whether it's a comedy that makes us laugh or a thrilling drama that keeps us on the edge of our seats, cinema and television provide moments of respite from our daily routines.\n\nIn conclusion, cinema and television are not mere forms of entertainment; they are transformative tools that educate, inspire, and unite us. They enrich our lives, broaden our horizons, and challenge our preconceptions, making them indispensable in our modern world.",
  },
  {
    id: 2,
    title: "The Impact of Technology",
    text: "Technology has revolutionized the way we live and work. From artificial intelligence to automation, technological advancements have enhanced productivity, efficiency, and convenience. However, they also raise concerns about privacy, security, and job displacement.\n\nAs we continue to integrate technology into our daily lives, it is crucial to balance innovation with ethical considerations. By doing so, we can harness its benefits while minimizing its risks.",
  },
  {
    id: 3,
    title: "Climate Change and Sustainability",
    text: "Climate change is one of the most pressing issues of our time. Rising temperatures, extreme weather events, and environmental degradation pose significant threats to our planet.\n\nSustainability efforts, such as renewable energy adoption, waste reduction, and conservation initiatives, are essential to mitigating these effects. Collective action and responsible policies are necessary to ensure a sustainable future for generations to come.",
  },
];

const Writing: React.FC = () => {
  const [remarks, setRemarks] = useState<{ [key: number]: string }>({});

  const handleRemarkChange = (id: number, value: string) => {
    setRemarks({ ...remarks, [id]: value });
  };
  return (
    <div className="container mt-4">
      {questions.map((question) => (
        <div key={question.id} className="card mb-4 shadow-sm">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center">
              <h2 className="card-title">
                {question.id}. {question.title}
              </h2>
              <button className="btn btn-outline-primary">
                Summarize Written Text
              </button>
            </div>
            <p className="card-text mt-3">{question.text}</p>
            <div className="card">
              <div className="remark p-3">
                <h5 className="mb-2">Remark</h5>
                <p>
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout.
                  The point of using Lorem Ipsum
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Writing;
