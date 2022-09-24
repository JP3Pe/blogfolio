import { readdirSync, readFileSync, statSync } from "fs";
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

  constructor(
    public readonly title: string,
    public readonly content: string,
    public readonly birthtime: Date
  ) {
    this.title = title;
    this.content = content;
    this.birthtime = birthtime;
  }

  public static getContentDirectoryName(): string {
    return Blog.CONTENT_DIRECTORY_NAME;
  }

  public static getAbsoluteFilePath(title: string) {
    return join(
      this.CONTENT_DIRECTORY_PATH,
      title,
      title + this.CONTENT_FORMAT
    );
  }

  public static async getMarkdown(fileContent: string) {
    return {
      markdownContent: (
        await remark().use(remarkHtml).process(fileContent)
      ).toString(),
    };
  }

  public static async getBlog(title: string) {
    return readFileSync(this.getAbsoluteFilePath(title)).toString();
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
      const birthtime = await this.getBlogCreatedDate(blogTitle);
      const blog = new Blog(blogTitle, blogContent, birthtime);
      blogsObjects.push(blog);
    }

    return blogsObjects;
  }

  public static async getBlogCreatedDate(title: string) {
    const fileMetadata = statSync(this.getAbsoluteFilePath(title));

    return fileMetadata["birthtime"];
  }
}