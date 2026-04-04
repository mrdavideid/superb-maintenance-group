import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-bg-pure">
      <div className="text-center">
        <span className="font-display text-[10rem] lg:text-[14rem] font-bold leading-none text-text/5">
          404
        </span>
        <h1 className="font-display text-3xl lg:text-4xl font-bold text-text -mt-8">
          Page not found
        </h1>
        <p className="text-text-secondary mt-4 mb-8">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          href="/"
          className="btn-outline"
        >
          Back to Home
        </Link>
      </div>
    </section>
  )
}
