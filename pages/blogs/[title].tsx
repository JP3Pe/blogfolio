import type { GetStaticPaths } from "next";
import HTMLReactParser from "html-react-parser";
import { join } from "path";
import { readdirSync } from "fs";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

import { getBlog } from "../../lib/file";

function Blog({ markdownContent }: Params) {
  return HTMLReactParser(markdownContent);
}

export async function getStaticProps({ params }: Params) {
  const { blogMarkdownContent } = await getBlog(params.title);
  return {
    props: { markdownContent: blogMarkdownContent },
  };
}

export const getStaticPaths: GetStaticPaths = async () => {
  const blogsFromDirectory = readdirSync(join(process.cwd(), "blogs"));

  const paths: string[] = [];
  blogsFromDirectory.map((blogTitle) => paths.push(`/blogs/${blogTitle}`));
  return {
    paths: paths,
    fallback: false,
  };
};

export default Blog;
