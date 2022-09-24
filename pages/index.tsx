import Link from "next/link";
import { BlogObject, Blogs } from "../lib/blogs";

type Props = {
  blogs: Array<BlogObject>;
  contentDirectoryName: string;
};

function Home({ blogs, contentDirectoryName }: Props) {
  return (
    <div className="blog__list">
      <h1>Blog post list</h1>
      <ul>
        {blogs.map((blog: BlogObject) => (
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
  const blogs = JSON.stringify(await Blogs.getBlogsObject());
  return {
    props: {
      blogs: JSON.parse(blogs),
      contentDirectoryName: Blogs.getContentDirectoryName(),
    },
  };
}

export default Home;
