import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";

export default function App({Component, pageProps:{session, ...pageProps} }: AppProps) {
  if ((Component as any).getLayout) {
    return (Component as any).getLayout(<Component {...pageProps} />);
  }
  return <>
  <SessionProvider session={session}>
  <Navbar/>
  <Component {...pageProps} />;
  </SessionProvider>
  </>
}
