import React, { useState, useEffect, useRef } from "react";
import { useMutation } from "@apollo/client";
import contact_post from "../graphql/post_contact";
import gsap from "gsap";

import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import TextArea from "@material-ui/core/TextareaAutosize";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  background: {
    width: "100%",
    height: "100%",
    backgroundImage:
      "url(https://lukas-petricek-portfolio.herokuapp.com/images/contact-us-background.jpeg)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    position: "absolute",
    top: "100vh",
    background: "grey",
  },
  root: {
    position: "absolute",
    top: "50%",
    left: "50%",
    padding: 20,
    transform: "translate(-50%,-50%)",
    opacity: "0",
    height: "60vh",
    width: "70vw",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 40,
    flexWrap: "wrap",
    overflowY: "scroll",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
  image: {
    height: "90%",
    width: "50%",
    background: "lightblue",
    minWidth: "300px",
    position: "relative",
    overflow: "hidden",
  },
  img: {
    width: "100%",
    height: "110%",
  },
  content: {
    width: "50%",
    height: "100%",
    background: "blue",
    minWidth: "300px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
    borderRadius: 40,
  },
  area: {
    width: "70%",
    height: "200px",
    minWidth: "50%",
    maxWidth: "70%",
    fontWeight: "bold",
    fontSize: "16px",
    padding: 10,
    outline: "none",
    minHeight: 100,
    maxHeight: 150,
    borderRadius: 30,
  },
  field: {
    background: "white",
    outline: "none",
    borderRadius: 10,
    fontSize: 15,
    fontWeight: "bold",
  },
}));

function Contact({ set_page_timeline }) {
  const classes = useStyles();
  const [tl] = useState(gsap.timeline());
  const main = useRef();
  const paper = useRef();
  const [contact_data, set_contact_data] = useState({
    email: "",
    username: "",
    message: "",
  });
  const [post_contact, { data }] = useMutation(contact_post);

  useEffect(() => {
    tl.to(main.current, 1, {
      y: "-100vh",
    });
    tl.to(
      paper.current,
      1,
      {
        opacity: 1,
        ease: "none",
      },
      "-=1"
    );
    set_page_timeline(tl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (data) {
      alert("Successfully contacted");
      set_contact_data({
        username: "",
        email: "",
        message: "",
      });
    }
  }, [data]);

  const posting_contact = () => {
    const { email, username, message } = contact_data;
    if (email && username && message) {
      post_contact({
        variables: {
          username,
          email,
          message,
        },
      });
    } else {
      alert("Failed");
    }
  };

  const set_contact = (target) => {
    const { value, name } = target;
    set_contact_data({ ...contact_data, [name]: value });
  };

  return (
    <section className={classes.background} ref={main}>
      <Paper className={classes.root} ref={paper}>
        <div className={classes.image}>
          <img
            className={classes.img}
            src={
              "https://lukas-petricek-portfolio.herokuapp.com/images/contact us.jpg"
            }
            alt="contact-us-img"
          />
        </div>
        <div className={classes.content}>
          <TextField
            type="text"
            variant="outlined"
            label="Name"
            name="username"
            className={classes.field}
            value={contact_data.username}
            onChange={(e) => set_contact(e.target)}
          />
          <TextField
            type="text"
            variant="outlined"
            label="Email"
            name="email"
            className={classes.field}
            value={contact_data.email}
            onChange={(e) => set_contact(e.target)}
          />
          <TextArea
            placeholder="Message"
            spellCheck={false}
            className={classes.area}
            name="message"
            value={contact_data.message}
            onChange={(e) => set_contact(e.target)}
          ></TextArea>
          <Button
            variant="contained"
            size="large"
            style={{ background: "red", color: "white", fontWeight: "bold" }}
            onClick={posting_contact}
          >
            Submit
          </Button>
        </div>
      </Paper>
    </section>
  );
}

export default Contact;
