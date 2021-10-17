import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";

function Courses({ set_page_timeline }) {
  const courses = useRef(null);
  const [tl] = useState(gsap.timeline());

  useEffect(() => {
    tl.to(courses.current, 1, {
      y: "-100vh",
    }).to(document.querySelectorAll(".content section"), 1, {
      stagger: 0.2,
      opacity: 1,
      display: "grid",
      ease: "back.out",
    });
    set_page_timeline(tl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section
      className="services"
      ref={courses}
      style={{
        backgroundImage:
          "url(https://api.lukas-petricek.com/images/about.jpg)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <main className="content">
        <section
          className="design"
          style={{
            backgroundImage:
              "url(https://api.lukas-petricek.com/images/design-background.jpeg)",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          <div className="text">
            <h1>Design</h1>
          </div>
        </section>
        <section
          className="web design"
          style={{
            backgroundImage:
              "url(https://api.lukas-petricek.com/images/web-design.jpeg)",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          <div className="text">
            <h1>Web design</h1>
          </div>
        </section>
        <section
          className="web development"
          style={{
            backgroundImage:
              "url(https://api.lukas-petricek.com/images/web-development.jpeg)",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          <div className="text">
            <h1>Web Development</h1>
          </div>
        </section>
        <section
          className="E-commerence"
          style={{
            backgroundImage:
              "url(https://api.lukas-petricek.com/images/ecommernce.jpeg)",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          <div className="text">
            <h1>E-commernce</h1>
          </div>
        </section>
      </main>
    </section>
  );
}

export default Courses;
