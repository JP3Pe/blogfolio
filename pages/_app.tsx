import type { AppProps } from "next/app";
import Head from "next/head";

import Layout from "../components/layout";

import "../styles/reset.css";
import "../styles/root.css";
// 블로그 게시물 관련 css
import "../styles/blog-detail.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
