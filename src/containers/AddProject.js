/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useMutation, gql } from "@apollo/client";
import axios from "axios";
import { useHistory } from "react-router-dom";

import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import SuperImage from "../components//super-image";

const useStyles = makeStyles(() => ({
  root: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",

    height: "auto",
    padding: 20,
    width: "300px",
    borderRadius: "30px",
    display: "grid",
    placeContent: "center",
  },
  form: {
    position: "realtive",
    minHeight: "400px",
    height: "auto",
    width: "300px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
}));

const POST_PROJECT = gql`
  mutation post_project(
    $title: String!
    $url: String!
    $descriptions: String!
    $technologies: [String]!
    $picture: String!
  ) {
    post_project(
      title: $title
      url: $url
      descriptions: $descriptions
      technologies: $technologies
      picture: $picture
    ) {
      title
      url
      picture
      technologies
      descriptions
    }
  }
`;

function AddProject() {
  const [form, set_form] = useState({
    title: "",
    descriptions: "",
    picture: "",
    url: "",
    technologies: "",
  });
  const history = useHistory();
  const classes = useStyles();
  const [post, { data, loading, error }] = useMutation(POST_PROJECT);

  const setForm = (e) => {
    const { name, value } = e.target;
    set_form({ ...form, [name]: value });
  };

  useEffect(() => {
    axios
      .get("https://api.lukas-petricek.com/verify-admin", {
        withCredentials: true,
      })
      .then(({ data }) => {
        alert(JSON.stringify(data));
        if (!data) history.replace("/portfolio");
      })
      .catch((err) => alert(JSON.stringify(err)));
  }, []);

  useEffect(() => {
    if (data) {
      set_form({
        title: "",
        descriptions: "",
        picture: "",
        url: "",
        technologies: "",
      });
      history.replace("/portfolio");
    }
  }, [data]);

  const post_it = (event) => {
    event.preventDefault();
    post({
      variables: {
        ...form,
        technologies: form.technologies.split(" "),
      },
    })
      .then((val) => alert(JSON.stringify(val)))
      .catch((err) => alert(JSON.stringify(err)));
  };

  if (error) return <h1>Error</h1>;
  else if (loading) return <h1>Loading</h1>;

  return (
    <>
      <SuperImage
        height={400}
        width={400}
        url="https://api.lukas-petricek.com/images/contact-us-background.jpeg"
      />
      <Paper className={classes.root} elevation={12}>
        <form
          className={classes.form}
          method="post"
          onSubmit={(e) => post_it(e)}
        >
          <Typography variant="h4" color="primary">
            Add Project
          </Typography>
          <TextField
            type="text"
            name="title"
            placeholder="title..."
            required
            label="title"
            value={form.title}
            onChange={(e) => setForm(e)}
          />
          <TextField
            type="text"
            name="technologies"
            multiline
            placeholder="technologeis..."
            required
            label="technologies"
            value={form.technologies}
            onChange={(e) => setForm(e)}
          />
          <TextField
            type="text"
            name="picture"
            placeholder="picture url..."
            required
            label="picture"
            value={form.picture}
            onChange={(e) => setForm(e)}
          />
          <TextField
            type="text"
            name="descriptions"
            placeholder="descriptions..."
            multiline
            required
            label="descriptions"
            value={form.descriptions}
            onChange={(e) => setForm(e)}
          />
          <TextField
            type="text"
            name="url"
            placeholder="url..."
            required
            label="url"
            value={form.url}
            onChange={(e) => setForm(e)}
          />
          <Button type="submit" color="secondary" variant="contained">
            Upload Project
          </Button>
        </form>
      <a target="_blank" href="https://api.lukas-petricek.com/files/Canada.docx">Download Info about Canada</a>
      </Paper>
    </>
  );
}

export default AddProject;
