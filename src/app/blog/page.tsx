import BlogList from "@/modules/BlogList";

export default function Home() {
    // Keep data structures easy to expand, modify, or fetch from endpoints later
    const blogList = [
        {
            blog: {
                label: "Test",
                link: "/blog/test?from=home",
                description: "tset",
                date: "20May2026",
            },
        },
    ];

    return (
        <main className="c-page-layout">
            {/* The single, declarative grid cluster module */}
            <BlogList items={blogList} />
        </main>
    );
}
