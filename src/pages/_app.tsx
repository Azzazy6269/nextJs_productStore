import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  if ((Component as any).getLayout) {
    return (Component as any).getLayout(<Component {...pageProps} />);
  }
  return <>
  <Navbar/>
  <Component {...pageProps} />;
  </>
}
