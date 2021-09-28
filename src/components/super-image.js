import React, { useState, useRef } from "react";

function SuperImage({ url, height, width }) {
  const parent = useRef(null);
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <div className="super-image-section" ref={parent}>
        <img alt="img" src={url} onLoad={() => setLoaded(true)} />
        {!loaded && (
          <section className="image-sceleton">
            <div className="sceleton-thumb"></div>
          </section>
        )}
      </div>
    </>
  );
}

export default SuperImage;
