import React, { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";

const routes = [
  { path: "/", name: "About Me" },
  { path: "/portfolio", name: "Portfolio" },
  { path: "/services", name: "Services" },
  { path: "/contact", name: "Contact" },
];

function SideMenu({
  active,
  set_active,
  timeline,
  menu_active,
  set_menu_active,
}) {
  const history = useHistory();
  const sidemenu = useRef(null);
  const main = useRef(null);

  useEffect(() => {
    timeline.to(main.current, 1, {
      y: "100vh",
      ease: "ease.Bounce",
    });
    timeline.to(sidemenu.current, 0.5, {
      opacity: 1,
    });
    timeline.to(".animated-hover", 0.3, {
      stagger: 0.1,
      scale: 1,
      ease: "none",
    });
    if (!active) {
      timeline.reverse();
    } else {
      timeline.restart();
    }

    window.addEventListener("resize", () => {
      timeline.reverse();
      set_menu_active(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  const redirect = async (e, path) => {
    e.preventDefault();
    await timeline.reverse();
    set_active(false);
    history.push(path);
  };

  return (
    <section className="sidemenu" ref={main}>
      <div className="content" ref={sidemenu}>
        {routes.map((route) => {
          return (
            <NavLink
              activeStyle={{ color: "white" }}
              to={route.path}
              onClick={(e) => redirect(e, route.path)}
            >
              <div className="animated-hover" key={route.path}>
                {route.name}
              </div>
            </NavLink>
          );
        })}
      </div>
    </section>
  );
}

export default SideMenu;
