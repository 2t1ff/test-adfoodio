import {
	Container,
	CircularProgress,
	Box,
	Card,
	makeStyles,
	IconButton,
} from "@material-ui/core";
import { AddShoppingCartOutlined } from "@material-ui/icons";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import { MenuNavBar } from "../components/MenuNavBar";
import { useGetServingsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useIsAuth } from "../utils/isAuth";

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
}));

const Menu: React.FC<MenuProps> = ({}) => {
	const router = useRouter();
	useIsAuth();
	const classes = useStyles();
	const [{ data, fetching, error }] = useGetServingsQuery();

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
	return (
		<>
			<MenuNavBar />
			<Box width="100vw">
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
									<h2 className={classes.price}>
										{meal.price.toFixed(2)}€
									</h2>
									<IconButton color="primary" size="small">
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
					<Box ml="auto" mt={5} height="30vh" width="50%" className={classes.drinks} />
				</Container>
			</Box>{" "}
		</>
	);
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Menu);
