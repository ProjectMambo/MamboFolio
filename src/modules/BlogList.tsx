import BlogEntry from "@/components/BlogEntry";
import { LabelLinkDesDate } from "@/components/Interfaces";

interface ListBlogItem {
  blog: LabelLinkDesDate;
}

interface BlogListProps {
  items: ListBlogItem[];
}

/**
 * Vertical list module that stacks editorial blog rows sequentially from top to bottom.
 */
export default function BlogList({ items }: BlogListProps) {
  const containerClasses = [
    "flex flex-col w-full" // Stacks items in a single full-width continuous layout row stream
  ].join(" ");

  return (
    <section className={containerClasses}>
      {items.map((item) => (
        <BlogEntry
          key={item.blog.link}
          blog={item.blog}
        />
      ))}
    </section>
  );
}