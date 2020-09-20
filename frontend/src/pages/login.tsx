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
import { useLoginMutation } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import NextLink from "next/link";

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
  link: {
      color: "#7430FB",
      textDecoration: "none",
      margin: 0,
      fontWeight: 500,
      cursor: "pointer"
  }
}));

const Login = () => {
  const [values, setValues] = useState({ usernameOrEmail: "", password: "" });
  const [{ data, fetching, error }, login] = useLoginMutation();
  const classes = useStyles();
  const router = useRouter();

  if (error) {
    console.log(error);
  }
  if (data && data.login.user) {
    if (typeof router.query.next === "string") {
      router.push(router.query.next);
    } else {
      router.push("/");
    }
  }

  const usernameOrEmailError =
    data && data.login.errors
      ? data.login?.errors[0]?.field === "usernameOrEmail"
        ? data.login.errors[0].message
        : undefined
      : undefined;

  const passwordError =
    data && data.login.errors
      ? data.login?.errors[0]?.field === "password"
        ? data.login.errors[0].message
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
        {data && data.login.user ? data.login.user.email : null}
        <form className={classes.form} noValidate>
          <TextField
            InputProps={{ className: classes.field }}
            InputLabelProps={{ className: classes.field }}
            color="secondary"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="usernameOrEmail"
            label="Username or Email"
            name="usernameOrEmail"
            autoComplete="email"
            value={values.usernameOrEmail}
            autoFocus
            onChange={(event) =>
              setValues({
                ...values,
                usernameOrEmail: event.target.value,
              })
            }
            error={!!usernameOrEmailError}
            helperText={usernameOrEmailError}
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
            onChange={(event) =>
              setValues({
                ...values,
                password: event.target.value,
              })
            }
            error={!!passwordError}
            helperText={passwordError}
          />
          <NextLink href="/register"><Box component="p" className={classes.link}>Don't have an account? Sign up!</Box></NextLink>
          <Button
            itemScope={true}
            focusRipple={true}
            formMethod="post"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={async () => {
              await login({ ...values });
            }}
          >
            Sign In
          </Button>
        </form>
      </div>
      <Box mt={8}></Box>
    </Container>
  );
};

export default withUrqlClient(createUrqlClient)(Login);
