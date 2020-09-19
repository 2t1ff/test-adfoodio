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

interface HomeNavBarProps {}

export const HomeNavBar: React.FC<HomeNavBarProps> = ({}) => {
	const [{ data, fetching }, _] = useMeQuery();

	let body = null;

	if (fetching) {
		body = (
			<>
				<CircularProgress />
			</>
		);
	} else if (!data?.me) {
		body = (
			<>
				<NextLink href="/login">
					<Button variant="text" color="secondary">
						Login
					</Button>
				</NextLink>
				<NextLink href="/register">
					<Button variant="text" color="primary">
						Register
					</Button>
				</NextLink>
			</>
		);
		// user is logged in
	} else {
		body = (
			<Box component="h3" color="#000">
				Welcome back{" "}
				<Box component="span" borderBottom="2px solid #7430FB">
					{data.me.username}
				</Box>
				!
			</Box>
		);
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
				<Box ml="auto" mr={4}>
					{body}
				</Box>
			</Toolbar>
		</AppBar>
	);
};
