import React, { useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import gsap from "gsap";
import SuperImage from "../components/super-image";

const filters = [
  "front-end",
  "back-end",
  "full-stack",
  "dev-ops",
  "MERN",
  "MongoDB",
  "React.js",
  "Node.js",
];

const get_portfolios = gql`
  query get_portfolios {
    portfolios {
      id
      picture
      url
      title
      descriptions
      technologies
    }
  }
`;

function Portfolio({ set_page_timeline }) {
  const history = useHistory();
  const { path } = useRouteMatch();
  const [tl] = useState(new gsap.timeline());
  const [show_technologies, set_show_technologies] = useState("");
  const [show_descriptions, set_show_descriptions] = useState({
    picture: "",
    title: "",
    descriptions: "",
    url: "",
    id: "",
  });
  const [portfolios, set_portfolios] = useState([]);
  const { data } = useQuery(get_portfolios);

  useEffect(() => {
    if (data) {
      set_portfolios(data.portfolios);
    }
  }, [data]);

  useEffect(() => {
    tl.to(".portfolio", 0.5, {
      y: "-100vh",
    });
    tl.to(".block", 0.5, {
      stagger: 0.05,
      opacity: 1,
      display: "block",
    });
    tl.to(".project", 0.5, {
      stagger: 0.1,
      opacity: 1,
      display: "block",
    });
    set_page_timeline(tl);
  }, [set_page_timeline, tl]);

  const filter = (name) => {
    history.push(`${path}?filter=${name}`);
  };

  return (
    <>
      <section className="portfolio">
        <div className="filters">
          {filters.map((filt) => {
            return (
              <div onClick={() => filter(filt)} className="block">
                {filt}
              </div>
            );
          })}
        </div>
        <div className="content">
          {history && (
            <div className="main" title="Show more">
              {portfolios.map(
                ({ picture, title, technologies, descriptions, url, id }) => {
                  return (
                    <div
                      onClick={() =>
                        set_show_descriptions({
                          picture,
                          title,
                          descriptions,
                          url,
                          id,
                        })
                      }
                      className="project"
                      onMouseEnter={() => set_show_technologies(id)}
                      onMouseLeave={() => set_show_technologies("")}
                    >
                      <SuperImage url={picture} />
                      <h1>{title}</h1>
                      {show_technologies === id && (
                        <div className="technologies">
                          {technologies.map((value) => {
                            return <h2 className="technology">{value}</h2>;
                          })}
                        </div>
                      )}
                    </div>
                  );
                }
              )}
            </div>
          )}
        </div>
      </section>
      {show_descriptions.url && (
        <div
          className="project-descriptions-background"
          onClick={() => set_show_descriptions("")}
        >
          <div
            className="project-descriptions"
            style={{
              backgroundImage: `url(${show_descriptions.picture})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            <h1>{show_descriptions.title}</h1>
            <p>{show_descriptions.descriptions}</p>
            <a href={show_descriptions.url} target="_blank" rel="noreferrer">
              <button type="button">Visit Website</button>
            </a>
          </div>
        </div>
      )}
    </>
  );
}

export default Portfolio;
