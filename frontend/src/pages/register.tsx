import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/dist/client/router";
import React, { useState } from "react";
import { useRegisterMutation } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  field: {
    color: "#000",
  },
}));

const Register = () => {
  const [values, setValues] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [{ data, fetching, error }, register] = useRegisterMutation();
  const classes = useStyles();
  const router = useRouter();

  if (error) {
    console.log(error);
  }
  if (data && data.registerUser.user) {
    if (typeof router.query.next === "string") {
      router.push(router.query.next);
    } else {
      router.push("/");
    }
  }

  const usernameError =
    data && data.registerUser.errors
      ? data.registerUser?.errors[0]?.field === "username"
        ? data.registerUser.errors[0].message
        : undefined
      : undefined;
  const emailError =
    data && data.registerUser.errors
      ? data.registerUser?.errors[0]?.field === "email"
        ? data.registerUser.errors[0].message
        : undefined
      : undefined;

  const passwordError =
    data && data.registerUser.errors
      ? data.registerUser?.errors[0]?.field === "password"
        ? data.registerUser.errors[0].message
        : undefined
      : undefined;

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        {data && data.registerUser.user ? data.registerUser.user.email : null}
        <form className={classes.form} noValidate>
          <TextField
            InputProps={{ className: classes.field }}
            InputLabelProps={{ className: classes.field }}
            color="secondary"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            value={values.username}
            autoFocus
            error={!!usernameError}
            helperText={usernameError}
            onChange={(event) =>
              setValues({
                ...values,
                username: event.target.value,
              })
            }
          />{" "}
          <TextField
            InputProps={{ className: classes.field }}
            InputLabelProps={{ className: classes.field }}
            color="secondary"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={values.email}
            autoFocus
            error={!!emailError}
            helperText={emailError}
            onChange={(event) =>
              setValues({
                ...values,
                email: event.target.value,
              })
            }
          />
          <TextField
            InputProps={{ className: classes.field }}
            InputLabelProps={{ className: classes.field }}
            color="secondary"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={values.password}
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            error={!!passwordError}
            helperText={passwordError}
            onChange={(event) =>
              setValues({
                ...values,
                password: event.target.value,
              })
            }
          />
          <Button
            itemScope={true}
            focusRipple={true}
            formMethod="post"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => {
              register({ ...values });
            }}
          >
            Register
          </Button>
        </form>
      </div>
      <Box mt={8}></Box>
    </Container>
  );
};

export default withUrqlClient(createUrqlClient)(Register);
