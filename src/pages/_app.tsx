import { type AppType } from "next/app";
import { trpcApi } from "@/lib-client/services/trpc-api";
import { ClerkProvider } from "@clerk/nextjs";
import "@/styles/globals.css";
import { env } from "@/env.mjs";
import { Toaster } from "@/components-common/ui/Toaster";

const MyApp: AppType = ({ Component, pageProps: { ...pageProps } }) => {
  return (
    <ClerkProvider
      publishableKey={env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
      {...pageProps}
    >
      <Component {...pageProps} />
      <Toaster />
    </ClerkProvider>
  );
};

export default trpcApi.withTRPC(MyApp);
