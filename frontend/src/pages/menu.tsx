import {
  Container,
  CircularProgress,
  Box,
  Card,
  makeStyles,
  IconButton,
  Fab,
  Badge,
} from "@material-ui/core";
import {
  AddShoppingCartOutlined,
  ShoppingCartOutlined,
} from "@material-ui/icons";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { MenuNavBar } from "../components/MenuNavBar";
import { useGetServingsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { getCartLength } from "../utils/getCartLength";
import { useIsAuth } from "../utils/isAuth";
import { isServer } from "../utils/isServer";

interface MenuProps {}

const useStyles = makeStyles((theme) => ({
  category: {
    display: "flex",
    marginTop: "3vh",
  },
  meal: {
    backgroundImage:
      "url(https://images.unsplash.com/photo-1528216142275-f64d7a59d8d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1371&q=80)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    border: "2px solid #7430FB",
  },
  drinks: {
    backgroundImage:
      "url(https://images.unsplash.com/photo-1504310578167-435ac09e69f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    border: "2px solid #7430FB",
  },
  meal_title: {
    color: "black",
    lineHeight: "100%",
    margin: 0,
    fontFamily: "Lato",
    fontSize: 60,
  },
  purple: {
    color: "#7430FB",
  },
  serving: {
    margin: 0,
    textDecoration: "underline",
    textDecorationColor: "#7430FB",
    fontWeight: "normal",
  },
  price: {
    margin: 0,
  },
  items: {
    mb: 5,
  },
  dessert: {
    backgroundImage:
      "url(https://images.unsplash.com/photo-1587314168485-3236d6710814?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1270&q=80)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    border: "2px solid #7430FB",
    backgroundPosition: "center",
  },
  fab: {
    position: "fixed",
    bottom: "5%",
    right: "5%",
  },
}));

const Menu: React.FC<MenuProps> = ({}) => {
  const router = useRouter();
  useIsAuth();
  const classes = useStyles();
  const [{ data, fetching, error }] = useGetServingsQuery();
  const [count, setCount] = useState(0);

  const addToCart = (id: string) => {
    const stored = localStorage.getItem("item" + id);
    if (!stored) {
      localStorage.setItem("item" + id, "1");
    } else {
      localStorage.setItem("item" + id, (parseInt(stored) + 1).toString());
    }
      setCount(count + 1);
  };

  if (error) {
    return <div>Something went wrong, please try again.</div>;
  } else if (fetching) {
    return (
      <>
        <MenuNavBar />
        <Box
          width="100%"
          height="100vh"
          alignItems="center"
          display="flex"
          justifyContent="center"
        >
          <CircularProgress />
        </Box>
      </>
    );
  }

  const foodArray = data.getServings.filter((val) => val.category === "food");
  const drinksArray = data.getServings.filter(
    (val) => val.category === "drink"
  );
  const dessertsArray = data.getServings.filter(
    (val) => val.category === "dessert"
  );
   if (count !== getCartLength()) {
      
      setCount(getCartLength());
    }
  return (
    <>
      <MenuNavBar />
      <Box width="100%">
        <Container className={classes.category} maxWidth="lg">
          <Box height="30vh" width="50%" className={classes.meal} />
          <Box
            ml={8}
            display="flex"
            justifyContent="space-between"
            flexDirection="column"
          >
            <Box className={classes.meal_title} component="h1">
              DELICIOUS
            </Box>
            <Box className={classes.meal_title} component="h1">
              <span className={classes.purple}>LOVE BASED</span>
            </Box>
            <Box className={classes.meal_title} component="h1">
              MEALS
            </Box>
          </Box>
        </Container>
        <Container maxWidth="lg">
          {foodArray.map((meal) => {
            return (
              <Box
                key={meal.id}
                p={1}
                my={2}
                display="flex"
                border="2px solid black"
                borderRadius="5px"
                justifyContent="space-between"
              >
                <h2 className={classes.serving}>{meal.name}</h2>
                <Box display="flex">
                  <h2 className={classes.price}>{meal.price.toFixed(2)}€</h2>
                  <IconButton
                    onClick={() => addToCart(meal.id.toString())}
                    color="primary"
                    size="small"
                  >
                    {" "}
                    <AddShoppingCartOutlined />
                  </IconButton>
                </Box>
              </Box>
            );
          })}
        </Container>

        <Container className={classes.category} maxWidth="lg">
          <Box
            mt={5}
            display="flex"
            justifyContent="space-between"
            flexDirection="column"
          >
            <Box className={classes.meal_title} component="h1">
              INSTANTLY
            </Box>
            <Box className={classes.meal_title} component="h1">
              <span className={classes.purple}>REFRESHING</span>
            </Box>
            <Box className={classes.meal_title} component="h1">
              DRINKS
            </Box>
          </Box>
          <Box
            ml="auto"
            mt={5}
            height="30vh"
            width="50%"
            className={classes.drinks}
          />
        </Container>

        <Container maxWidth="lg">
          {drinksArray.map((drink) => {
            return (
              <Box
                key={drink.id}
                p={1}
                my={2}
                display="flex"
                border="2px solid black"
                borderRadius="5px"
                justifyContent="space-between"
              >
                <h2 className={classes.serving}>{drink.name}</h2>
                <Box display="flex">
                  <h2 className={classes.price}>{drink.price.toFixed(2)}€</h2>
                  <IconButton
                    onClick={() => addToCart(drink.id.toString())}
                    color="primary"
                    size="small"
                  >
                    {" "}
                    <AddShoppingCartOutlined />
                  </IconButton>
                </Box>
              </Box>
            );
          })}
        </Container>
        <Container className={classes.category} maxWidth="lg">
          <Box mt={5} height="30vh" width="50%" className={classes.dessert} />
          <Box
            mt={5}
            ml={8}
            display="flex"
            justifyContent="space-between"
            flexDirection="column"
          >
            <Box className={classes.meal_title} component="h1">
              TRICK OR
            </Box>
            <Box className={classes.meal_title} component="h1">
              <span className={classes.purple}>SWEET</span>
            </Box>
            <Box className={classes.meal_title} component="h1">
              DESSERTS
            </Box>
          </Box>
        </Container>
        <Container maxWidth="lg">
          {dessertsArray.map((dessert) => {
            return (
              <Box
                key={dessert.id}
                p={1}
                my={2}
                display="flex"
                border="2px solid black"
                borderRadius="5px"
                justifyContent="space-between"
              >
                <h2 className={classes.serving}>{dessert.name}</h2>
                <Box display="flex">
                  <h2 className={classes.price}>{dessert.price.toFixed(2)}€</h2>
                  <IconButton
                    onClick={() => addToCart(dessert.id.toString())}
                    color="primary"
                    size="small"
                  >
                    {" "}
                    <AddShoppingCartOutlined />
                  </IconButton>
                </Box>
              </Box>
            );
          })}
        </Container>

        <Fab
          className={classes.fab}
          size="large"
          color="primary"
          aria-label="add"
          onClick={() => router.push("/cart")}
        >
          <Badge badgeContent={count} color="error">
            <ShoppingCartOutlined />
          </Badge>
        </Fab>
      </Box>{" "}
    </>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(Menu);
