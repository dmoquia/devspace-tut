import fs from "fs";
import path from "path";
import * as matter from "gray-matter";
import { sortByDate } from "../utils";

const files = fs.readdirSync(path.join("posts"));

export function getPosts() {
  const posts = files.map((filename) => {
    const slug = filename.replace(".md", ""); // this will remove the filename exts
    const markdownWithMeta = fs.readFileSync(
      path.join("posts", filename),
      "utf-8"
    );

    const { data: frontmatter } = matter(markdownWithMeta);
    return {
      slug,
      frontmatter,
    };
  });
  return posts.sort(sortByDate);
}
