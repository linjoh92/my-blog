import "@/styles/globals.css";
import type { AppProps } from "next/app";
import RootLayout from "../components/root-layout";

import { SessionContextProvider } from "@supabase/auth-helpers-react";

import { supabase } from "@/lib/supabaseClient";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <SessionContextProvider
        supabaseClient={supabase}
        initialSession={pageProps.initialSession}
      >
        <RootLayout>
          <Component {...pageProps} />
        </RootLayout>
        <div id="root" />
      </SessionContextProvider>
    </>
  );
}
