import HTMLReactParser from "html-react-parser";

import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { Blogs } from "../../lib/blogs";

function Blog({ markdownContent }: Params) {
  return HTMLReactParser(markdownContent);
}

export async function getStaticProps({ params }: Params) {
  const blogs = new Blogs();
  const { markdownContent: markdownContent } = await blogs.getBlog(
    params.title
  );
  return {
    props: { markdownContent: markdownContent },
  };
}

export async function getStaticPaths() {
  const blogs = new Blogs();
  const staticPaths: string[] = [];
  (await blogs.getBlogs()).map((blogTitle) =>
    staticPaths.push(`/${blogs.getContentDirectoryName()}/${blogTitle}`)
  );
  return {
    paths: staticPaths,
    fallback: false,
  };
}

export default Blog;
