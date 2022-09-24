import HTMLReactParser from "html-react-parser";

import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { Blog } from "../../lib/blog";

function BlogHtmlContent({ markdownContent }: Params) {
  return HTMLReactParser(markdownContent);
}

export async function getStaticProps({ params }: Params) {
  const { markdownContent: markdownContent } = await Blog.getMarkdown(
    await Blog.getBlog(params.title)
  );
  return {
    props: { markdownContent: markdownContent },
  };
}

export async function getStaticPaths() {
  const staticPaths: string[] = [];
  (await Blog.getBlogTitles()).map((blogTitle) =>
    staticPaths.push(`/${Blog.getContentDirectoryName()}/${blogTitle}`)
  );
  return {
    paths: staticPaths,
    fallback: false,
  };
}

export default BlogHtmlContent;
