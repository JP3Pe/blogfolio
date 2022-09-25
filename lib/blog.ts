import { existsSync, readdirSync, readFileSync, statSync } from "fs";
import { join } from "path";

import { remark } from "remark";
import remarkHtml from "remark-html";

export class Blog {
  public static readonly CONTENT_FORMAT: string = ".md";
  public static readonly CONTENT_DIRECTORY_NAME: string = "blogs";
  public static readonly PUBLIC_DIRECTORY_NAME: string = "public";
  public static readonly IMG_DIRECTORY_NAME: string = "img";
  public static readonly REPRESENTATIVE_IMAGE_FILE_NAME =
    "representative_image.jpg";
  public static readonly CONTENT_DIRECTORY_ABSOLUTE_PATH: string = join(
    process.cwd(),
    this.PUBLIC_DIRECTORY_NAME,
    Blog.CONTENT_DIRECTORY_NAME
  );
  public static readonly IMG_DIRECTORY_ABSOLUTE_PATH: string = join(
    process.cwd(),
    this.PUBLIC_DIRECTORY_NAME,
    this.IMG_DIRECTORY_NAME
  );
  public static readonly DEFAULT_REPRESENTATIVE_IMAGE_RELATIVE_PATH: string =
    join("/", this.IMG_DIRECTORY_NAME, this.REPRESENTATIVE_IMAGE_FILE_NAME);
  public static readonly BLOG_TITLES = readdirSync(
    this.CONTENT_DIRECTORY_ABSOLUTE_PATH
  );

  constructor(
    public readonly title: string,
    public readonly content: string,
    public readonly birthtime: Date,
    public readonly representativeImageRelativePath: string
  ) {
    this.title = title;
    this.content = content;
    this.birthtime = birthtime;
    this.representativeImageRelativePath = representativeImageRelativePath;
  }

  public static getContentAbsoluteFilePath(title: string) {
    return join(
      this.CONTENT_DIRECTORY_ABSOLUTE_PATH,
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
    return readFileSync(this.getContentAbsoluteFilePath(title)).toString();
  }

  public static async getBlogsObject() {
    const blogsObject = new Array<Blog>();

    for (const blogTitle of this.BLOG_TITLES) {
      const blogContent = await this.getBlog(blogTitle);
      const birthtime = await this.getBlogCreatedDate(blogTitle);
      const representativeImageRelativePath =
        await this.getBlogRepresentativeImageRelativePath(blogTitle);
      const blog = new Blog(
        blogTitle,
        blogContent,
        birthtime,
        representativeImageRelativePath
      );
      blogsObject.push(blog);
    }

    return blogsObject;
  }

  public static async getBlogCreatedDate(title: string) {
    const fileMetadata = statSync(this.getContentAbsoluteFilePath(title));

    return fileMetadata["birthtime"];
  }

  public static async getBlogRepresentativeImageRelativePath(title: string) {
    const contentRepresentativeImageRelativePath = join(
      "/",
      this.CONTENT_DIRECTORY_NAME,
      title,
      this.REPRESENTATIVE_IMAGE_FILE_NAME
    );
    const contentRepresentativeImageAbsolutePath = join(
      this.CONTENT_DIRECTORY_ABSOLUTE_PATH,
      title,
      this.REPRESENTATIVE_IMAGE_FILE_NAME
    );

    const isRepresentativeImageExist: boolean = existsSync(
      contentRepresentativeImageAbsolutePath
    );
    return isRepresentativeImageExist
      ? contentRepresentativeImageRelativePath
      : this.DEFAULT_REPRESENTATIVE_IMAGE_RELATIVE_PATH;
  }
}
