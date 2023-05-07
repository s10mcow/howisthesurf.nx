import { UserProvider } from "@auth0/nextjs-auth0/client";
import type { AppProps } from "next/app";
import BaseStyles from "../styles/base-styles";
import Head from "next/head";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const { user } = pageProps;

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="description" content="Surf cams" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <UserProvider user={user}>
          <BaseStyles />
          <Component {...pageProps} />
        </UserProvider>
      </QueryClientProvider>
    </>
  );
}
