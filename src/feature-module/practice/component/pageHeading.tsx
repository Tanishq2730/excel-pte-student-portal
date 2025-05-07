import React from "react";

interface PageHeadingProps {
  title: string;
}

const PageHeading: React.FC<PageHeadingProps> = ({ title }) => {
  const shortIcon = title
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase())
    .join("");

  return (
    <div className="pageheading">
      <div className="shortIcon">
        {shortIcon}
        <span>AI</span>
      </div>
      <h3>{title}</h3>
    </div>
  );
};

export default PageHeading;
