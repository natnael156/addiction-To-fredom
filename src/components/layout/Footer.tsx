import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-800 py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-zinc-600 text-sm">
          © {new Date().getFullYear()} AddictionToFreedom. All rights reserved.
        </p>
        <div className="flex items-center gap-5">
          <Link href="/about" className="text-zinc-600 hover:text-zinc-400 text-sm transition-colors">
            About
          </Link>
          <a
            href="https://www.instagram.com/addiction_to_freedomm"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-600 hover:text-zinc-400 text-sm transition-colors"
          >
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
}
