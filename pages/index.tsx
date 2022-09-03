import type { NextPageContext } from "next";
import { getBlog } from "../lib/file";
import HTMLReactParser from "html-react-parser";

function Home({ markdownContent }) {
  return HTMLReactParser(markdownContent);
}

export async function getStaticProps(context: NextPageContext) {
  const { blogMarkdownContent } = await getBlog();
  return {
    props: { markdownContent: blogMarkdownContent },
  };
}

export default Home;
