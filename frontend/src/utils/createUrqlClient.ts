import { isServer } from "./isServer";

export const createUrqlClient = (ssrExchange: any, ctx: any) => {
	let cookie;
	if (isServer()) {
		cookie = ctx?.req?.headers?.cookie;
	}

	return {
		url: "http://api.adfoodio.site/graphql",
		fetchOptions: {
			credentials: "include" as const,
			headers: cookie
				? {
						cookie,
				  }
				: undefined,
		},
	};
};
