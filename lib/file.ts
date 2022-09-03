import { readFileSync } from "fs";
import { join } from "path";
import { remark } from "remark";
import remarkHtml from "remark-html";

export async function getBlog() {
  const blogsDirectory = join(process.cwd(), "blogs");
  const filePath = join(blogsDirectory, "/2022/09-03-index.md");

  const fileContent = readFileSync(filePath).toString();
  const markdownContent = (
    await remark().use(remarkHtml).process(fileContent)
  ).toString();

  return { blogMarkdownContent: markdownContent };
}
