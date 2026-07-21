import Link from 'next/link';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-zinc-950/90 backdrop-blur border-b border-zinc-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="font-bold text-white text-lg tracking-tight">
          Addiction<span className="text-primary-400">ToFreedom</span>
        </Link>
        <nav className="flex items-center gap-6">
          <Link href="/#books" className="text-sm text-zinc-400 hover:text-white transition-colors">
            Books
          </Link>
          <Link href="/#faq" className="text-sm text-zinc-400 hover:text-white transition-colors">
            FAQ
          </Link>
          <Link href="/about" className="text-sm text-zinc-400 hover:text-white transition-colors">
            About
          </Link>
        </nav>
      </div>
    </header>
  );
}
