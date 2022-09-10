import Link from "next/link";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

import { Blogs } from "../lib/blogs";

function Home({ blogTitles, contentDirectoryName }: Params) {
  return (
    <div className="blog__list">
      <h1>Blog post list</h1>
      <ul>
        {blogTitles.map((blogTitle: string) => (
          <li key={blogTitle}>
            <Link
              href={`/${contentDirectoryName}/${encodeURIComponent(blogTitle)}`}
            >
              <a>{blogTitle}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getStaticProps() {
  return {
    props: {
      blogTitles: await Blogs.getBlogs(),
      contentDirectoryName: Blogs.getContentDirectoryName(),
    },
  };
}

export default Home;
