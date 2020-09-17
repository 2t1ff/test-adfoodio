import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { NavBar } from "../components/NavBar";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { Button, makeStyles } from "@material-ui/core";
import NextLink from "next/link";

const useStyles = makeStyles((theme) => ({
	image: {
		backgroundImage:
			"url(https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80)",
		backgroundRepeat: "no-repeat",
		backgroundSize: "cover",
		backgroundPosition: "center",
	},
}));

const Index = () => {
	const classes = useStyles();

	return (
		<>
			<NavBar />
			<Box display="flex" width="100%">
				<Box className={classes.image} height="100vh" width="50%"></Box>
				<Box
					display="flex"
					flexDirection="column"
					justifyContent="space-evenly"
					height="100vh"
					width="50%"
				>
					<Box
						ml={8}
						textAlign="left"
						component="h1"
						color="black"
						fontSize={100}
						
						fontFamily="Lato"
					>
						HOMEMADE FOOD DELIVERY.
					</Box>
					<Box
						ml={8}
						textAlign="left"
						component="h1"
						color="#444"
						fontSize={44}
						fontWeight="300"
						fontStyle="italic"
					>
						- Tastes as good as Grandma's!
					</Box>
					<Box alignSelf="center" >
						<NextLink  href="/menu">
							<Button size="large" variant="outlined" color="secondary" >
								Order now
							</Button>
						</NextLink>
					</Box>
				</Box>
			</Box>
		</>
	);
};

export default withUrqlClient(createUrqlClient, {ssr: true})(Index);
