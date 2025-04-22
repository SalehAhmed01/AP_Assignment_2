import Link from "next/link";

export default function Layout({ children }) {
  return (
    <>
      <header className="bg-slate-800 text-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex flex-wrap items-center justify-between">
            <Link href="/" className="text-xl font-bold">
              MovieHouse
            </Link>
            <div className="flex space-x-6">
              <Link href="/" className="hover:text-blue-300">
                Home
              </Link>
              <Link href="/movies" className="hover:text-blue-300">
                Movies
              </Link>
              <Link href="/genres" className="hover:text-blue-300">
                Genres
              </Link>
              <Link href="/directors" className="hover:text-blue-300">
                Directors
              </Link>
              <Link href="/help/faqs" className="hover:text-blue-300">
                Help
              </Link>
            </div>
          </nav>
        </div>
      </header>
      {children}
    </>
  );
}
