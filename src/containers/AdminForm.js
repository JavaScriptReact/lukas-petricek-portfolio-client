import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";

import CloseIcon from "@material-ui/icons/ArrowBack";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "column",
    height: 400,
    width: 400,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
  },
  icon: {
    transform: "scale(2)",
    margin: 25,
  },
}));

function AdminForm({ action }) {
  const history = useHistory();
  const classes = useStyles();
  const [value, setValue] = useState("");

  const close = () => {
    action(false);
  };

  const login = () => {
  document.cookie = "admin=Lugy; expires=Thu, 18 Dec 2022 12:00:00 UTC; domain=lukas-petricek.com; httpOnly=true; secure=true"
    axios
      .post(
        "https://lukas-petricek-portfolio.herokuapp.com/admin",
        { code: value },
        { withCredentials: true }
      )
      .then(({ data }) => {
        if (data) {
          history.push("/add-project");
        }

        action(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Tooltip title="Close and Go back">
        <IconButton onClick={close} className={classes.icon}>
          <CloseIcon />
        </IconButton>
      </Tooltip>
      <Paper className={classes.root}>
        <Typography color="primary" variant="h4">
          Admin Login Form
        </Typography>
        <form autoComplete="off" onSubmit={(e) => e.preventDefault()}>
          <TextField
            id="text"
            label="Add admin code ..."
            name="code"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <Button
            variant="contained"
            color="secondary"
            type="submit"
            onClick={login}
          >
            Login
          </Button>
        </form>
      </Paper>
    </>
  );
}

export default AdminForm;
