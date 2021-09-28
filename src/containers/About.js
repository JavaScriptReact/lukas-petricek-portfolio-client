import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import TypingEffect from "../components/TypingEffect";
import Tooltip from "@material-ui/core/Tooltip";
import gsap from "gsap";
import SuperImage from "../components/super-image";

import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";
import GithubIcon from "@material-ui/icons/GitHub";

const sm_data = [
  {
    name: "Facebook",
    link: "https://www.facebook.com/lukas.petricek.370/",
    background: "rgb(24, 24, 121)",
    icon: <FacebookIcon />,
  },
  {
    name: "Twitter",
    link: "https://www.twitter.com/",
    background: "rgb(15, 112, 202)",
    icon: <TwitterIcon />,
  },
  {
    name: "Github",
    link: "https://www.github.com/JavaScriptReact",
    background: "rgb(53, 55, 56)",
    icon: <GithubIcon />,
  },
  {
    name: "Instagram",
    link: "https://www.instagram.com/lucas_developer_",
    background: "linear-gradient(-45deg ,orange , blue)",
    icon: <InstagramIcon />,
  },
];

function About({ set_page_timeline, anim }) {
  const history = useHistory();
  const [timeline] = React.useState(gsap.timeline());

  useEffect(() => {
    set_page_timeline(timeline);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    timeline
      .to(".about", 0.5, {
        y: "-100vh",
      })
      .to(".sm", 1, {
        left: 0,
        ease: "back",
      })
      .to(".logo", 0.5, {
        opacity: 1,
        ease: "none",
      })
      .to(".animate", 0.05, {
        stagger: 0.005,
        opacity: 1,
        ease: "none",
      })
      .to(
        ".action",
        0.5,
        {
          scale: 1,
          ease: "back",
        },
        "-=0.2"
      );
  }, [timeline]);

  const services = async () => {
    await anim();
    await timeline.reverse();
    history.push("/services");
  };

  const contact_me = async () => {
    await anim;
    await timeline.reverse();
    history.push("/contact");
  };

  const portfolio = (e) => {
    e.preventDefault();
    timeline.reverse().then(() => history.push("/portfolio"));
  };

  return (
    <>
      <section className="about">
        <SuperImage url="https://lukas-petricek-portfolio.herokuapp.com/images/about.jpg" />
        <main className="sm-section">
          <span className="sm">
            {sm_data.map((data) => {
              return (
                <Tooltip title={data.name} key={data.name}>
                  <a href={data.link} target="_blank" rel="noreferrer">
                    <div
                      style={{
                        background: data.background,
                        position: "relative",
                      }}
                    >
                      {data.icon}
                    </div>
                  </a>
                </Tooltip>
              );
            })}
          </span>
        </main>
        <main className="content-section">
          <div className="logo">
            <img
              src={
                "https://lukas-petricek-portfolio.herokuapp.com/images/personal.jpg"
              }
              alt="logo"
            />
          </div>
          <div className="content">
            <TypingEffect
              portfolio={portfolio}
              services={services}
              contact_me={contact_me}
              header="Welcome, my name is Lukáš Petříček."
              text="I am 15 years old Full-Stack Developer and UI/UX web designer. |
You can look at my work and rate each one in the  |
                    If you want help, visit |
                    For partnership "
            />
          </div>
          <button type="button" className="action" onClick={portfolio}>
            Discover more
          </button>
        </main>
        <main className="action-section"></main>
      </section>
    </>
  );
}

export default About;
