import ProjectGrid from "@/modules/ProjectGrid";

export default function Home() {
    // Keep data structures easy to expand, modify, or fetch from endpoints later
    const personalFleet = [
        {
            project: {
                label: "Project Mambo",
                link: "https://projectmambo.org",
                description: "A series of stuff.",
            },
            colour: "var(--color-shale-green)",
        },
    ];

    return (
        <main className="min-h-screen bg-bg text-fg p-8 md:p-16 font-mono max-w-5xl mx-auto">
            {/* The single, declarative grid cluster module */}
            <ProjectGrid items={personalFleet} />
        </main>
    );
}
