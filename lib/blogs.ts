import { readdirSync, readFileSync } from "fs";
import { join } from "path";

import { remark } from "remark";
import remarkHtml from "remark-html";

export class Blogs {
  constructor(
    private readonly CONTENT_DIRECTORY_NAME: string = "blogs",
    private readonly BLOGS_DIRECTORY_PATH: string = join(
      process.cwd(),
      CONTENT_DIRECTORY_NAME
    )
  ) {}

  public getContentDirectoryName(): string {
    return this.CONTENT_DIRECTORY_NAME;
  }

  public async getMarkdown(fileContent: string) {
    return (await remark().use(remarkHtml).process(fileContent)).toString();
  }

  public async getBlog(title: string) {
    const absoluteFilePath = join(this.BLOGS_DIRECTORY_PATH, title);
    const fileContent = readFileSync(absoluteFilePath).toString();

    return { markdownContent: await this.getMarkdown(fileContent) };
  }

  public async getBlogs() {
    return readdirSync(join(process.cwd(), this.CONTENT_DIRECTORY_NAME));
  }
}
