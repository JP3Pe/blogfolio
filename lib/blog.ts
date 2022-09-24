import { readdirSync, readFileSync } from "fs";
import { join } from "path";

import { remark } from "remark";
import remarkHtml from "remark-html";

export class Blog {
  public static readonly CONTENT_DIRECTORY_NAME: string = "blogs";
  public static readonly PUBLIC_DIRECTORY_NAME: string = "public";
  public static readonly CONTENT_FORMAT: string = ".md";
  public static readonly CONTENT_DIRECTORY_PATH: string = join(
    process.cwd(),
    this.PUBLIC_DIRECTORY_NAME,
    Blog.CONTENT_DIRECTORY_NAME
  );

  constructor(public readonly title: string, public readonly content: string) {
    this.title = title;
    this.content = content;
  }

  public static getContentDirectoryName(): string {
    return Blog.CONTENT_DIRECTORY_NAME;
  }

  public static async getMarkdown(fileContent: string) {
    return {
      markdownContent: (
        await remark().use(remarkHtml).process(fileContent)
      ).toString(),
    };
  }

  public static async getBlog(title: string) {
    const absoluteFilePath = join(
      this.CONTENT_DIRECTORY_PATH,
      title,
      title + this.CONTENT_FORMAT
    );

    return readFileSync(absoluteFilePath).toString();
  }

  public static async getBlogTitles() {
    return readdirSync(
      join(
        process.cwd(),
        this.PUBLIC_DIRECTORY_NAME,
        this.CONTENT_DIRECTORY_NAME
      )
    );
  }

  public static async getBlogsObject() {
    const blogTitles = await this.getBlogTitles();

    const blogsObjects = new Array<Blog>();
    for (const blogTitle of blogTitles) {
      const blogContent = await this.getBlog(blogTitle);
      const blog = new Blog(blogTitle, blogContent);
      blogsObjects.push(blog);
    }

    return blogsObjects;
  }
}
