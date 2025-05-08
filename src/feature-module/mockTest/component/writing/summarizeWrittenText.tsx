import React, { useState } from "react";

const SummarizeWritinText: React.FC = () => {
  return (
    <div className="container mt-3">
      <div className="card p-3">
        <p>
          The 1920's movie goers experience was largely dominated by silent
          movies but saw the introduction of synchronized sound. In the 1920's
          movie stars were really stars - with huge salaries, the fashions and
          activities of the Hollywood greats echoed around the world and 100,000
          people would gather in cities all over the world, including such
          diverse cities as London and Moscow, to greet Mary Pickford and
          Douglas Fairbanks when they toured of Europe. Early silent movies were
          often accompanied by live piano or organ music and provided enormous
          entertainment value to audiences captivated by the experience of
          watching moving pictures on the silver screen. Although there had been
          previous attempts to introduce sound, it wasn’t until 1923 that a
          synchronized sound track was photographically recorded and printed on
          to the side of the strip of motion picture film and made it on to a
          commercially distributed movie. It would still be seven long years
          before talking pictures gained total supremacy and finally replaced
          the silent film era. The first movie theatres were called
          Nickelodeons, and were very basic compared to the luxurious picture
          palaces that followed but what an aura of excitement, of laughter, fun
          and tears surrounded them! Before the introduction of movie
          soundtracks, movies were often accompanied by scripted music from a
          piano.
        </p>
      </div>
      <div className="card p-3 mt-3">
        <textarea
          className="form-control"
          rows={16}
          placeholder="Write a Summary..."
        ></textarea>
      </div>
    </div>
  );
};

export default SummarizeWritinText;
