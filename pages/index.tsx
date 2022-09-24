import Link from "next/link";
import { Blog } from "../lib/blog";

type Props = {
  blogs: Array<Blog>;
  contentDirectoryName: string;
};

function Home({ blogs, contentDirectoryName }: Props) {
  return (
    <div className="blog__list">
      <h1>Blog post list</h1>
      <ul>
        {blogs.map((blog: Blog) => (
          <li key={blog.title}>
            <Link
              href={`/${contentDirectoryName}/${encodeURIComponent(
                blog.title
              )}`}
            >
              <a>{blog.title}</a>
            </Link>
            <p className="blog__list--content">
              {blog.content.length > 100
                ? blog.content.substring(0, 100) + "..."
                : blog.content}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getStaticProps() {
  const blogs = JSON.stringify(await Blog.getBlogsObject());
  return {
    props: {
      blogs: JSON.parse(blogs),
      contentDirectoryName: Blog.getContentDirectoryName(),
    },
  };
}

export default Home;
