import Link from "next/link";

export default function Custom404() {
  return (
    <main className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[70vh]">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-6">Page Not Found</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-8 text-center max-w-md">
        Oops! The page you are looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        Go Home
      </Link>
    </main>
  );
}
