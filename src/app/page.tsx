export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black text-white p-24">
      <div className="relative flex place-items-center">
        <h1 className="text-6xl font-black tracking-tighter sm:text-8xl animate-pulse">
          MAMBO<span className="text-blue-500">FOLIO</span>
        </h1>
      </div>

      <div className="mt-8 flex flex-col items-center gap-2">
        <p className="font-mono text-sm uppercase tracking-widest text-zinc-500">
          Status: Work in Progress
        </p>
        <div className="h-1 w-48 overflow-hidden rounded-full bg-zinc-800">
          <div className="h-full w-1/3 animate-progress bg-blue-500"></div>
        </div>
      </div>
    </main>
  );
}