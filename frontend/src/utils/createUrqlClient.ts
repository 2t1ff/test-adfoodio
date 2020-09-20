import { cacheExchange } from "@urql/exchange-graphcache";
import  Router  from "next/router";
import { dedupExchange, Exchange, fetchExchange } from "urql";
import { pipe, tap } from "wonka";
import { CreateOrderMutation, LoginMutation, MeDocument, MeQuery, MyOrdersQuery } from "../generated/graphql";
import { betterUpdateQuery } from "./betterUpdateQuery";
import { isServer } from "./isServer";

export const errorExchange: Exchange = ({ forward }) => (ops$) => {

	return pipe(
		forward(ops$),
		tap(({ error }) => {
			if (error?.message.includes("not authenticated")) {
				Router.replace("/login");
			}
		})
	);
};

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
		exchanges: [
			dedupExchange,
			cacheExchange({
				updates: {
					Mutation: {
						login: (_result, args, cache, info) => {
							
							betterUpdateQuery<LoginMutation, MeQuery>(
								cache,
								{ query: MeDocument },
								_result,
								(result, query) => {
									if (result.login.errors) {
										return query;
									} else {
										return {
											me: result.login.user,
										};
									}
								}
							);
						},
						createOrder: (_result, args, cache, info) => {
							cache.invalidate("Query", "getOrders");
						}
					},
				},
			}),
			errorExchange,
			ssrExchange,
			fetchExchange,
		],
	};
};
