import { Box, CircularProgress, Container, makeStyles } from "@material-ui/core";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { MenuNavBar } from "../components/MenuNavBar";
import { useMyOrdersQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

const useStyles = makeStyles((theme) => ({
 kitchen: {

 },
 serving: {
 margin: 0,
    textDecoration: "underline",
    textDecorationColor: "#7430FB",
    fontWeight: "normal",
 },
 purple: {
     color:"#7430FB"
 }
}));


const Orders: React.FC<{}> = ({}) => {
  const router = useRouter();
  const classes = useStyles();
  const [{ data, fetching, error }] = useMyOrdersQuery();

  let orders: typeof data.me.orders;
  if (data) {
    orders = data.me.orders.reverse();
  }

  const showStatus = (status: string)=> {
      if (status === "kitchen") {
         return <h2 className={classes.kitchen}>We're cooking it! 👨‍🍳</h2>
      }
      if (status === "ready") {
         return <h2 className={classes.kitchen}>Ready for pick up! 🍲</h2>
      }
      if (status === "picked up") {
         return <h2 className={classes.kitchen}>Enjoy the food! 🤰🏻</h2>
      }

  }



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

  return (
    <>
 <MenuNavBar />
      <Container maxWidth="md">
        {orders.map((order) => {
          return (
            <Box key={order.id} padding={2} mb={4} borderRadius="5px" border="2px solid black">
              <Box display="flex" justifyContent="space-around">
                <h1>Order <span className={classes.purple}>ID</span>: {order.id}</h1>
                {showStatus(order.state)}
              </Box>
              {order.orderItems.map((item) => (
                <h2 className={classes.serving}>
                 - {item.serving.name} x {item.quantity}
                </h2>
              ))}
            </Box>
          );
        })}
      </Container>
    </>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(Orders);
