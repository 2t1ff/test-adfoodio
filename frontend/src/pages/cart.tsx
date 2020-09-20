import {
  Box,
  Button,
  CircularProgress,
  Container,
  IconButton,
  makeStyles,
} from "@material-ui/core";
import {
  AddShoppingCartOutlined,
  Check,
  DeleteForeverOutlined,
  DeleteOutlined,
} from "@material-ui/icons";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { MenuNavBar } from "../components/MenuNavBar";
import {
  useGetServingsQuery,
  useCreateOrderMutation,
  useGetOffersQuery,
} from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { getCartIds } from "../utils/getCartIds";
import { getCartLength } from "../utils/getCartLength";
import { getTotal } from "../utils/getTotal";

interface CartProps {}
const useStyles = makeStyles((theme) => ({
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
  span: {
    fontWeight: 600,
  },
  total: {
    margin: 0,
  },
  totalPrice: {
    margin: 0,
    fontWeight: "normal",
  },
  button: {
    border: "1px solid #7430FB",
  },
}));
const Cart: React.FC<CartProps> = ({}) => {
  const classes = useStyles();
  const router = useRouter();
  const [{ data: offersData }] = useGetOffersQuery();
  const [{ data, fetching, error }] = useGetServingsQuery();
  const [_, createOrder] = useCreateOrderMutation();
  const [ids, setIds] = useState([]);
  const [offer, setOffer] = useState(null);

  if (fetching) {
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
  } else if (data) {
    if (ids.length !== getCartIds().length) {
      setIds(getCartIds());
    }
    const servingsInCart = data.getServings.filter((serving) =>
      ids.includes(serving.id.toString())
    );
    const cartItems = [];
    data.getServings.forEach((serving) => {
      if (ids.includes(serving.id.toString())) {
        for (
          let i = 0;
          i < parseInt(localStorage.getItem("item" + serving.id));
          i++
        ) {
          cartItems.push(serving);
        }
      }
    });

    return (
      <>
        <MenuNavBar />
        <Container maxWidth="md">
          {servingsInCart.map((serving) => {
            return (
              <Box
                key={serving.id}
                p={1}
                my={2}
                display="flex"
                border="2px solid black"
                borderRadius="5px"
                justifyContent="space-between"
              >
                <h2 className={classes.serving}>
                  {serving.name}{" "}
                  <span className={classes.span}>
                    x {localStorage.getItem("item" + serving.id)}
                  </span>
                </h2>
                <Box display="flex">
                  <h2 className={classes.price}>
                    {(
                      serving.price *
                      parseInt(localStorage.getItem("item" + serving.id))
                    ).toFixed(2)}
                    €
                  </h2>
                  <IconButton
                    color="primary"
                    size="small"
                    onClick={() => {
                      localStorage.removeItem("item" + serving.id);
                      setIds(ids.filter((id) => id !== serving.id));
                    }}
                  >
                    {" "}
                    <DeleteOutlined color="error" />
                  </IconButton>
                </Box>
              </Box>
            );
          })}
          {offersData ? (
            <Box mt={2}>
              {offersData.getOffers.map((offerData) => {
                return (
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    border="2px solid orange"
                  >
                    <h2>{offerData.name}</h2>
                    {offerData !== offer ? (
                      <Button onClick={() => setOffer(offerData)}>Apply</Button>
                    ) : (
                      <Button onClick={() => setOffer(null)}> <Check /></Button>
                    )}
                  </Box>
                );
              })}
            </Box>
          ) : null}
          <Box
            display="flex"
            justifyContent="space-between"
            mt={5}
            borderBottom="3px solid #7430FB"
          >
            <h1 className={classes.total}>TOTAL:</h1>
            <h1 className={classes.totalPrice}>
              {getTotal(cartItems, offer).toFixed(2)}€
            </h1>
          </Box>
        </Container>
        <Box mt={5} mx="auto" width="fit-content">
          <Button
            className={classes.button}
            size="large"
            variant="outlined"
            color="secondary"
            onClick={async () => {
              const cartItems = servingsInCart.map((val) => {
                return {
                  servingId: val.id,
                  quantity: parseInt(
                    localStorage.getItem("item" + val.id.toString())
                  ),
                };
              });
              await createOrder({ cartItems });
              localStorage.clear();
              router.push("/orders");
            }}
          >
            Order now
          </Button>
        </Box>
      </>
    );
  }
};

export default withUrqlClient(createUrqlClient, { ssr: false })(Cart);
