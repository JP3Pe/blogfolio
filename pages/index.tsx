import Image from "next/image";
import Link from "next/link";
import { Blog } from "../lib/blog";

type Props = {
  blogs: Array<Blog>;
  contentDirectoryName: string;
};

function Home({ blogs, contentDirectoryName }: Props) {
  return (
    <div className="blog-list">
      <ul>
        {blogs.map((blog: Blog) => (
          <li key={blog.title}>
            <Link
              href={`/${contentDirectoryName}/${encodeURIComponent(
                blog.title
              )}`}
            >
              <a className="blog-list__title">{blog.title}</a>
            </Link>
            <Image
              src={blog.representativeImagePath}
              alt={blog.title + "대표 이미지"}
              layout="responsive"
              width={1}
              height={1}
            />
            <span className="blog-list__birthtime">
              {new Date(blog.birthtime.toString()).getFullYear()}-
              {new Date(blog.birthtime.toString()).getMonth()}-
              {new Date(blog.birthtime.toString()).getDate()}
            </span>
            <p className="blog-list__content">
              {blog.content.length > 500
                ? blog.content.substring(0, 500) + "..."
                : blog.content}
            </p>
          </li>
        ))}
      </ul>
      <style jsx>
        {`
          .blog-list {
            padding: 10vh 10vw;
          }

          .blog-list ul {
            display: grid;
            gap: 5vh;
          }

          .blog-list ul > li {
            display: grid;
          }

          .blog-list__title {
            display: block;
            margin-bottom: 0.3em;
            font-weight: var(--font-weight-heavy);
            font-size: 1.3em;
          }

          .blog-list__birthtime {
            display: block;
            color: grey;
            font-size: 0.7em;
            margin-bottom: 0.5em;
          }

          .blog-list__content {
            font-size: 1em;
            font-weight: var(--font-weight-normal);
          }
        `}
      </style>
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
