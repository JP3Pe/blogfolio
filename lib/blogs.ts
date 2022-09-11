import { readdirSync, readFileSync } from "fs";
import { join } from "path";

import { remark } from "remark";
import remarkHtml from "remark-html";

export class Blogs {
  public static readonly CONTENT_DIRECTORY_NAME: string = "blogs";
  public static readonly PUBLIC_DIRECTORY_NAME: string = "public";
  public static readonly CONTENT_FORMAT: string = ".md";
  public static readonly CONTENT_DIRECTORY_PATH: string = join(
    process.cwd(),
    this.PUBLIC_DIRECTORY_NAME,
    Blogs.CONTENT_DIRECTORY_NAME
  );

  public static getContentDirectoryName(): string {
    return Blogs.CONTENT_DIRECTORY_NAME;
  }

  public static async getMarkdown(fileContent: string) {
    return (await remark().use(remarkHtml).process(fileContent)).toString();
  }

  public static async getBlog(title: string) {
    const absoluteFilePath = join(
      this.CONTENT_DIRECTORY_PATH,
      title,
      title + this.CONTENT_FORMAT
    );
    const fileContent = readFileSync(absoluteFilePath).toString();

    return { markdownContent: await this.getMarkdown(fileContent) };
  }

  public static async getBlogs() {
    return readdirSync(
      join(
        process.cwd(),
        this.PUBLIC_DIRECTORY_NAME,
        this.CONTENT_DIRECTORY_NAME
      )
    );
  }
}
