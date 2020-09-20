import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  getServings: Array<Serving>;
  me?: Maybe<User>;
  getOrders: Array<Order>;
  getOffers: Array<Offer>;
};

export type Serving = {
  __typename?: 'Serving';
  id: Scalars['Int'];
  name: Scalars['String'];
  price: Scalars['Float'];
  description: Scalars['String'];
  category: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  username: Scalars['String'];
  email: Scalars['String'];
  createdAt: Scalars['String'];
  orders: Array<Order>;
  updatedAt: Scalars['String'];
};

export type Order = {
  __typename?: 'Order';
  id: Scalars['Int'];
  userId: Scalars['String'];
  totalPrice: Scalars['Float'];
  user: User;
  orderItems: Array<OrderItem>;
  state: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type OrderItem = {
  __typename?: 'OrderItem';
  id: Scalars['Int'];
  orderId: Scalars['Int'];
  order: Order;
  servingId: Scalars['Int'];
  serving: Serving;
  quantity: Scalars['Int'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Offer = {
  __typename?: 'Offer';
  id: Scalars['Int'];
  name: Scalars['String'];
  type: Scalars['String'];
  value: Scalars['Int'];
  requiredMeals: Scalars['Int'];
  requiredDrinks: Scalars['Int'];
  requiredDesserts: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createServing: Serving;
  deleteServing: Scalars['Boolean'];
  registerUser: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  createOrder: Order;
  createOffer: Offer;
};


export type MutationCreateServingArgs = {
  category: Scalars['String'];
  description: Scalars['String'];
  price: Scalars['Float'];
  name: Scalars['String'];
};


export type MutationDeleteServingArgs = {
  id: Scalars['Int'];
};


export type MutationRegisterUserArgs = {
  options: UsernamePasswordInput;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};


export type MutationCreateOrderArgs = {
  totalPrice: Scalars['Float'];
  cartItems: Array<CartItem>;
};


export type MutationCreateOfferArgs = {
  name: Scalars['String'];
  requiredDesserts: Scalars['Int'];
  requiredDrinks: Scalars['Int'];
  requiredMeals: Scalars['Int'];
  value: Scalars['Int'];
  type: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type UsernamePasswordInput = {
  email: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
};

export type CartItem = {
  servingId: Scalars['Int'];
  quantity: Scalars['Int'];
};

export type CreateOrderMutationVariables = Exact<{
  cartItems: Array<CartItem>;
  totalPrice: Scalars['Float'];
}>;


export type CreateOrderMutation = (
  { __typename?: 'Mutation' }
  & { createOrder: (
    { __typename?: 'Order' }
    & Pick<Order, 'id' | 'userId'>
    & { orderItems: Array<(
      { __typename?: 'OrderItem' }
      & Pick<OrderItem, 'id' | 'servingId' | 'quantity'>
      & { serving: (
        { __typename?: 'Serving' }
        & Pick<Serving, 'name' | 'price'>
      ) }
    )> }
  ) }
);

export type LoginMutationVariables = Exact<{
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'email' | 'username'>
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'message' | 'field'>
    )>> }
  ) }
);

export type RegisterMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
  email: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { registerUser: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'email'>
    )> }
  ) }
);

export type GetOffersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetOffersQuery = (
  { __typename?: 'Query' }
  & { getOffers: Array<(
    { __typename?: 'Offer' }
    & Pick<Offer, 'name' | 'id' | 'type' | 'value' | 'requiredMeals' | 'requiredDrinks' | 'requiredDesserts'>
  )> }
);

export type GetServingsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetServingsQuery = (
  { __typename?: 'Query' }
  & { getServings: Array<(
    { __typename?: 'Serving' }
    & Pick<Serving, 'id' | 'name' | 'description' | 'category' | 'price'>
  )> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username' | 'email'>
  )> }
);

export type MyOrdersQueryVariables = Exact<{ [key: string]: never; }>;


export type MyOrdersQuery = (
  { __typename?: 'Query' }
  & { getOrders: Array<(
    { __typename?: 'Order' }
    & Pick<Order, 'id' | 'totalPrice' | 'state'>
    & { orderItems: Array<(
      { __typename?: 'OrderItem' }
      & Pick<OrderItem, 'quantity'>
      & { serving: (
        { __typename?: 'Serving' }
        & Pick<Serving, 'name'>
      ) }
    )> }
  )> }
);


export const CreateOrderDocument = gql`
    mutation CreateOrder($cartItems: [CartItem!]!, $totalPrice: Float!) {
  createOrder(cartItems: $cartItems, totalPrice: $totalPrice) {
    id
    userId
    orderItems {
      id
      servingId
      serving {
        name
        price
      }
      quantity
    }
  }
}
    `;

export function useCreateOrderMutation() {
  return Urql.useMutation<CreateOrderMutation, CreateOrderMutationVariables>(CreateOrderDocument);
};
export const LoginDocument = gql`
    mutation Login($usernameOrEmail: String!, $password: String!) {
  login(usernameOrEmail: $usernameOrEmail, password: $password) {
    user {
      id
      email
      username
    }
    errors {
      message
      field
    }
  }
}
    `;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const RegisterDocument = gql`
    mutation Register($username: String!, $password: String!, $email: String!) {
  registerUser(options: {username: $username, password: $password, email: $email}) {
    errors {
      field
      message
    }
    user {
      id
      username
      email
    }
  }
}
    `;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const GetOffersDocument = gql`
    query GetOffers {
  getOffers {
    name
    id
    type
    value
    requiredMeals
    requiredDrinks
    requiredDesserts
  }
}
    `;

export function useGetOffersQuery(options: Omit<Urql.UseQueryArgs<GetOffersQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetOffersQuery>({ query: GetOffersDocument, ...options });
};
export const GetServingsDocument = gql`
    query GetServings {
  getServings {
    id
    name
    description
    category
    price
  }
}
    `;

export function useGetServingsQuery(options: Omit<Urql.UseQueryArgs<GetServingsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetServingsQuery>({ query: GetServingsDocument, ...options });
};
export const MeDocument = gql`
    query Me {
  me {
    id
    username
    email
  }
}
    `;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};
export const MyOrdersDocument = gql`
    query MyOrders {
  getOrders {
    id
    totalPrice
    state
    orderItems {
      serving {
        name
      }
      quantity
    }
  }
}
    `;

export function useMyOrdersQuery(options: Omit<Urql.UseQueryArgs<MyOrdersQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MyOrdersQuery>({ query: MyOrdersDocument, ...options });
};