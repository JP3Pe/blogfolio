import HTMLReactParser from "html-react-parser";

import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { Blogs } from "../../lib/blogs";

function Blog({ markdownContent }: Params) {
  return HTMLReactParser(markdownContent);
}

export async function getStaticProps({ params }: Params) {
  const { markdownContent: markdownContent } = await Blogs.getMarkdown(
    await Blogs.getBlog(params.title)
  );
  return {
    props: { markdownContent: markdownContent },
  };
}

export async function getStaticPaths() {
  const staticPaths: string[] = [];
  (await Blogs.getBlogTitles()).map((blogTitle) =>
    staticPaths.push(`/${Blogs.getContentDirectoryName()}/${blogTitle}`)
  );
  return {
    paths: staticPaths,
    fallback: false,
  };
}

export default Blog;
