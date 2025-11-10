import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/blog/posts";
import { generateBlogPostMetadata } from "@/lib/seo/metadata";
import { generateBlogPostSchema, generateBreadcrumbSchema } from "@/lib/seo/structured-data";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return generateBlogPostMetadata({
    title: post.title,
    description: post.description,
    slug: post.slug,
    publishedAt: post.date,
    modifiedAt: post.date,
    tags: post.tags,
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const blogSchema = generateBlogPostSchema({
    title: post.title,
    description: post.description,
    slug: post.slug,
    publishedAt: post.date,
    modifiedAt: post.date,
    keywords: post.tags,
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
    { name: post.title, url: `/blog/${post.slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      {/* Article content */}
      <article>
        {/* ... */}
      </article>
    </>
  );
}