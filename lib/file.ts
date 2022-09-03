import { readFileSync } from "fs";
import { join } from "path";

export async function getBlog() {
  const blogsDirectory = join(process.cwd(), "blogs");
  const filePath = join(blogsDirectory, "/2022/09-03-index.md");

  const fileContent = readFileSync(filePath).toString();

  return { blog: fileContent };
}
