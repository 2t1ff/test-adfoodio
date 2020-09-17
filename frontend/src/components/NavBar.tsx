import {
	AppBar,
	Box,
	Button,
	IconButton,
	Toolbar,
	Typography,
	Link,
	CircularProgress,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import React from "react";
import NextLink from "next/link";
import { useMeQuery } from "../generated/graphql";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
	const [{ data, fetching }, _] = useMeQuery();

	console.log(data);
	let body = null;

	if (fetching) {
		body = (
			<>
				<CircularProgress />
			</>
		);
	} else if (!data?.me) {
		body = (
			<NextLink href="/login">
				<Button variant="text" color="secondary">
					Login
				</Button>
			</NextLink>
		);
		// user is logged in
	} else {
		body = data.me.username;
	}

	return (
		<AppBar
			style={{ marginTop: 10 }}
			position="absolute"
			elevation={0}
			color="transparent"
		>
			{" "}
			<Toolbar>
				<Typography color="textPrimary" variant="h5">
					Powered by
				</Typography>
				<Typography color="textPrimary" variant="h3">
					AdLudio
				</Typography>
				<Box ml="auto">{body}</Box>
			</Toolbar>
		</AppBar>
	);
};
