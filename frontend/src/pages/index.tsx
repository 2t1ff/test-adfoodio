import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { HomeNavBar } from "../components/HomeNavBar";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { Button, makeStyles } from "@material-ui/core";
import NextLink from "next/link";

const useStyles = makeStyles((theme) => ({
	image: {
		backgroundImage:
			"url(/background.jpeg)",
		backgroundRepeat: "no-repeat",
		backgroundSize: "cover",
		backgroundPosition: "center",
	},
	logo: {
		backgroundImage:
			"url(/logo.png)",
		backgroundRepeat: "no-repeat",
		backgroundSize: "contain",
		backgroundPosition: "center",
	},
	button: {
		border: "1px solid #7430FB"
	},
	span: {
		color:"#7430FB" 
	}
}));

const Index = () => {
	const classes = useStyles();

	return (
		<>
			<HomeNavBar />
			<Box display="flex" width="100%">
				<Box display="flex" justifyContent="flex-end" flexDirection="column" className={classes.image} height="100vh" width="50%">
					<Box
						alignSelf="flex-start"
						className={classes.logo}

						width="60%"
						height="20%"
					/>
				</Box>
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
						HOMEMADE <span className={classes.span}>FOOD </span>DELIVERY.
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
						- Tastes as <span className={classes.span}>good</span> as Grandma's!
					</Box>
					<Box alignSelf="center">
						<NextLink href="/menu">
							<Button
								className={classes.button}
								size="large"
								variant="outlined"
								color="secondary"
							>
								Order now
							</Button>
						</NextLink>
					</Box>
				</Box>
			</Box>
		</>
	);
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
