import { readFileSync } from "fs";
import { join } from "path";
import { remark } from "remark";
import remarkHtml from "remark-html";

export async function getBlog(filePath: string) {
  const blogsDirectoryPath = join(process.cwd(), "blogs");
  const absoluteFilePath = join(blogsDirectoryPath, filePath);

  const fileContent = readFileSync(absoluteFilePath).toString();
  const markdownContent = (
    await remark().use(remarkHtml).process(fileContent)
  ).toString();

  return { blogMarkdownContent: markdownContent };
}
