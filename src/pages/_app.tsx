import { type AppType } from "next/app";
import { trpcApi } from "@/lib-client/services/trpc-api";
import { ClerkProvider } from "@clerk/nextjs";
import "@/styles/globals.css";
import { env } from "@/env.mjs";

const MyApp: AppType = ({ Component, pageProps: { ...pageProps } }) => {
  return (
    <ClerkProvider
      publishableKey={env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
      {...pageProps}
    >
      <Component {...pageProps} />
    </ClerkProvider>
  );
};

export default trpcApi.withTRPC(MyApp);
