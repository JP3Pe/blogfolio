import { readdirSync } from "fs";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import Link from "next/link";
import { join } from "path";

function Home({ blogTitles }: Params) {
  return (
    <div className="blog__list">
      <h1>Blog post list</h1>
      <ul>
        {blogTitles.map((blogTitle: string) => (
          <li key={blogTitle}>
            <Link href={`/blogs/${encodeURIComponent(blogTitle)}`}>
              <a>{blogTitle}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export const getStaticProps = async () => {
  const blogsFromDirectory = readdirSync(join(process.cwd(), "blogs"));

  return {
    props: { blogTitles: blogsFromDirectory },
  };
};

export default Home;
