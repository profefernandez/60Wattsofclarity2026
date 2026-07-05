import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="not-found min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
      <div className="text-8xl mb-6">🔦</div>
      <h1 className="text-[#ffb300] mb-4">Page Not Found</h1>
      <p className="text-[#d9d9d9] text-lg mb-8 max-w-md">
        Looks like this page has lost its signal. Let us get you back to clarity.
      </p>
      <Link href="/" className="cta-gold text-lg">
        Back to Home
      </Link>
    </div>
  );
}
