import fs from "fs";
import matter from "gray-matter";
import path from "path";
import Link from "next/link";
import { marked } from "marked";
import Layout from "../../components/Layout";
import CategoryLabel from "../../components/CategoryLabel";
export default function PostPage({
  frontmatter: { title, category, cover_image, author_image, author, date },
  content,
  slug,
}) {
  return (
    <Layout>
      <Link href="/blog">go back</Link>
      <div className="w-full px-10 py-6 bg-white rounded-lg shadow-md mt-6">
        <div className="flex justify-between items-center mt-4">
          <h1 className="text-5xl mb-7">{title}</h1>
          <CategoryLabel>{category}</CategoryLabel>
        </div>
        <img src={cover_image} alt="" className="w-full rounded" />
        <div className="flex justify-between items-center bg-gray-100 p-2 my-8">
          <div className="flex items-center">
            <img
              src={author_image}
              alt=""
              className="mx-4 w-12 h-12 object-cover rounded-full hidden sm:block"
            />
            <h4>{author}</h4>
          </div>
          <div className="mr-4">{date}</div>
        </div>
        <div className="blog-text mt-2">
          <div dangerouslySetInnerHTML={{ __html: marked(content) }}></div>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  // this will only get the path from http://localhost:3000/blog/javascript-performance-tips
  const files = fs.readdirSync(path.join("posts"));
  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace(".md", ""),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const markdownWithMeta = fs.readFileSync(
    path.join("posts", slug + ".md"),
    "utf-8"
  );
  const { data: frontmatter, content } = matter(markdownWithMeta);
  return {
    props: { frontmatter, content, slug },
  };
}
