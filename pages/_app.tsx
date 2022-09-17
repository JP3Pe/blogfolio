import type { AppProps } from "next/app";

import Layout from "../components/layout";

import "../styles/reset.css";
import "../styles/root.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
