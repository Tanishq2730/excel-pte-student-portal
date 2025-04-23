import React from 'react';  

interface RTLMarqueeProps {
  text: string;
}

const RTLMarquee: React.FC<RTLMarqueeProps> = ({ text }) => {
  return (
    <div className="marquee-container">
      <div className="marquee-content">{text}</div>
    </div>
  );
};

export default RTLMarquee;
