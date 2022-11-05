import { join } from "path";
import { existsSync, readFileSync, writeFileSync } from "fs";
import { copy } from "fs-extra";

import { Blog } from "./blog";

export class Replicator {
  public static async isBlogContentsReplicated() {
    return existsSync(Blog.CONTENT_DIRECTORY_ABSOLUTE_PATH);
  }

  public static async replicateBlogContents() {
    const sourceDirectoryPath = join(
      Blog.ROOT_DIRECTORY_PATH,
      Blog.CONTENT_DIRECTORY_NAME
    );
    const destinationDirectoryPath = join(Blog.CONTENT_DIRECTORY_ABSOLUTE_PATH);
    try {
      // Copy original content directory into public directory
      await copy(sourceDirectoryPath, destinationDirectoryPath);
    } catch (err) {
      console.error(err);
    }

    console.log(
      `Successful copy directory from ${sourceDirectoryPath} to ${destinationDirectoryPath}`
    );
  }

  public static async markdownImageUrlChanger(
    blogTitle: string,
    blogContent: string
  ) {
    return blogContent.replace(/!\[.*\]\(\S*.\\/g, `](${blogTitle}/`);
  }

  public static async modifyBlogContent(blogTitle: string) {
    const convertedBlogTitle = blogTitle.replace(/\s/g, "%20");
    const fileAbsolutePath = join(
      Blog.CONTENT_DIRECTORY_ABSOLUTE_PATH,
      blogTitle,
      blogTitle + Blog.CONTENT_FORMAT
    );
    const fileContent = readFileSync(fileAbsolutePath).toString();
    const convertedFileContent = await this.markdownImageUrlChanger(
      convertedBlogTitle,
      fileContent
    );
    writeFileSync(fileAbsolutePath, convertedFileContent);
  }

  public static async modifyBlogContents() {
    const blogTitles = await Blog.getBlogTitles();

    for (const blogTitle of blogTitles) {
      await this.modifyBlogContent(blogTitle);
    }
  }

  public static async createComputedBlogContents() {
    await this.replicateBlogContents();
    await this.modifyBlogContents();
  }
}
