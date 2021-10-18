import React, { useRef } from "react";
import { Switch, Route, useLocation, useHistory } from "react-router-dom";
import gsap from "gsap";

import About from "./containers/About";
import Portfolio from "./containers/Portfolio";
import Services from "./containers/Services";
import Contact from "./containers/Contact";
import Error from "./containers/Error";
import AddProject from "./containers/AddProject";

import SideMenu from "./components/SideMenu";

import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";

import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import ArrowRight from "@material-ui/icons/ChevronRight";
import ArrowLeft from "@material-ui/icons/ChevronLeft";

const routes = ["/", "/portfolio", "/services", "/contact"];

function App({ set_show_admin_form}) {
  const icon = useRef();
  const location = useLocation();
  const history = useHistory();
  const [menu_active, set_menu_active] = React.useState(false);
  const [timeline] = React.useState(gsap.timeline());
  const [page_timeline, set_page_timeline] = React.useState(gsap.timeline());

  React.useEffect(() => {
    gsap.to(".icon", 1, {
      scale: 1,
    });
  }, [menu_active]);

  React.useEffect(() => {
    gsap.to([".button", ".menu-icon"], 1, {
      scale: 1,
      ease: "Back.out",
    });
  }, [location.pathname]);

  const showSideMenu = () => {
    set_menu_active(!menu_active);
  };

  const default_animation = () => {
    gsap.to([".button", ".menu-icon"], 0.2, {
      scale: 0,
    });
  };

  const swipe_left = async (index) => {
    await default_animation();
    await page_timeline.reverse();
    history.push(routes[routes.indexOf(location.pathname) - 1]);
  };

  const swipe_right = async (index) => {
    await default_animation();
    await page_timeline.reverse();
    history.push(routes[routes.indexOf(location.pathname) + 1]);
  };

  return (
    <section className="app">
      <a
        href="https://github.com/JavaScriptReact"
        target="blank"
        rel="noreferrer"
      >
        <div className="flag">Follow Me</div>
      </a>
      <nav className="menu-icon" onClick={showSideMenu}>
        {!menu_active ? (
          <MenuIcon className="icon" ref={icon} />
        ) : (
          <CloseIcon className="icon" ref={icon} />
        )}
      </nav>
      <SideMenu
        active={menu_active}
        set_active={set_menu_active}
        timeline={timeline}
        menu_active={menu_active}
        set_menu_active={set_menu_active}
      />
      {/*   */}
      {location.pathname !== "/" && (
        <section className="left-banner">
          <Tooltip title={routes[routes.indexOf(location.pathname) - 1]}>
            <IconButton className="button" onClick={() => swipe_left()}>
              <ArrowLeft style={{ transform: "scale(4)" }} />
            </IconButton>
          </Tooltip>
        </section>
      )}
      <section className="center-banner">
        <Switch>
          <Route path="/add-project">
            <AddProject />
          </Route>
          <Route path="/" exact>
            <About
              set_page_timeline={set_page_timeline}
              anim={default_animation}
            />
          </Route>
          <Route path="/portfolio" exact>
            <Portfolio set_page_timeline={set_page_timeline} set_show_admin_form={set_show_admin_form} />
          </Route>
          <Route path="/services" exact>
            <Services set_page_timeline={set_page_timeline} />
          </Route>
          <Route path="/contact" exact>
            <Contact set_page_timeline={set_page_timeline} />
          </Route>
          <Route path="*">
            <Error />
          </Route>
        </Switch>
      </section>
      {location.pathname !== "/contact" && (
        <section className="right-banner">
          <Tooltip title={routes[routes.indexOf(location.pathname) + 1]}>
            <IconButton
              className="button"
              onClick={() => swipe_right(routes.indexOf(location.pathame))}
            >
              <ArrowRight style={{ transform: "scale(4)" }} />
            </IconButton>
          </Tooltip>
        </section>
      )}
    </section>
  );
}

export default App;
