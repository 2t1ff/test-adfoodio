import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
  Link,
  CircularProgress,
  makeStyles,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import React from "react";
import NextLink from "next/link";
import { useMeQuery } from "../generated/graphql";

const useStyles = makeStyles((theme) => ({
  logo: {
    backgroundImage: "url(/logo.png)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    backgroundPosition: "center",
    cursor: "pointer",
  },
}));

export const MenuNavBar: React.FC<{}> = ({}) => {
  const classes = useStyles();
  const [{ data, fetching }, _] = useMeQuery();
  return (
    <AppBar
      style={{ marginTop: 10 }}
      position="static"
      elevation={0}
      color="transparent"
    >
      {" "}
      <Toolbar>
        <NextLink href="/">
          <Box
            alignSelf="flex-start"
            className={classes.logo}
            width="12vw"
            height="6vh"
          />
        </NextLink>
        <Box ml="auto" mr={4}>
          <NextLink href="/menu">
            <Button variant="text" color="secondary">
Menu
            </Button>
          </NextLink>
          <NextLink href="/offers">
            <Button variant="text" color="secondary">
              Offers
            </Button>
          </NextLink>
          <NextLink href="/orders">
            <Button variant="text" color="primary">
              Orders
            </Button>
          </NextLink>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
