import { join } from "path";
import { existsSync } from "fs";
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

  public static async modifyBlogContents() {}
}
