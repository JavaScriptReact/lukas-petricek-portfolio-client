import React from "react";

function TypingEffect({ header, text, portfolio, services, contact_me }) {
  const split_header = String(header).split("");
  const texts = String(text).split("|");

  return (
    <>
      <div className="text">
        <h1 style={{ lineHeight: "30px" }}>
          {split_header.map((word) => {
            return (
              <span key={split_header.indexOf(word)} className="animate">
                {word}
              </span>
            );
          })}
        </h1>
        <p style={{ lineHeight: "30px" }}>
          {texts[0].split("").map((word) => {
            return <span className="animate">{word}</span>;
          })}
        </p>
        <p style={{ lineHeight: "30px" }}>
          {texts[1].split("").map((word) => {
            return (
              <>
                <span className="animate">{word}</span>
              </>
            );
          })}
          <span className="span-animate" onClick={portfolio}>
            <span className="animate">Portfolio section.</span>
          </span>
        </p>
        <p style={{ lineHeight: "30px" }}>
          {texts[2].split("").map((word) => {
            return (
              <>
                <span className="animate">{word}</span>
              </>
            );
          })}
          <span className="span-animate" onClick={services}>
            <span className="animate">Services.</span>
          </span>
        </p>
        <p style={{ liheHeight: "30px" }}>
          {texts[3].split("").map((word) => {
            return (
              <>
                <span className="animate">{word}</span>
              </>
            );
          })}
          <span className="span-animate" onClick={contact_me}>
            <span className="animate">Contact me.</span>
          </span>
        </p>
      </div>
    </>
  );
}

export default TypingEffect;
