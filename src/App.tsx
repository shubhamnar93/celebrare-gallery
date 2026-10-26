import { Gallery } from "./components/Gallery";

function App() {
  return (
    <div className="min-h-screen bg-linear-to-b from-zinc-50 to-zinc-100 text-zinc-900 antialiased">
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:py-14">
        <header className="mb-8">
          <p className="text-xs font-semibold tracking-[0.2em] text-zinc-400 uppercase">
            Gallery
          </p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">
            Curated photography
          </h1>
        </header>

        <Gallery />
      </div>
    </div>
  );
}

export default App;
