import BlogList from "@/modules/BlogList";

export default function Home() {
    // Keep data structures easy to expand, modify, or fetch from endpoints later
    const blogList = [
        {
            blog: {
                label: "MamboFolio",
                link: "https://github.com/ProjectMambo/MamboFolio",
                description: "Owner's portfolio",
                date: "20-05-2026",
            },
        },
        {
            blog: {
                label: "test",
                link: "https://github.com/ProjectMambo/test",
                description: "Owner's portfolio",
                date: "20-05-2026",
            },
        },
        {
            blog: {
                label: "test2",
                link: "https://github.com/ProjectMambo/test22",
                description: "tset",
                date: "20May2026",
            },
        },
    ];

    return (
        <main className="min-h-screen bg-bg text-fg p-8 md:p-16 font-mono max-w-5xl mx-auto">
            {/* The single, declarative grid cluster module */}
            <BlogList items={blogList} />
        </main>
    );
}
