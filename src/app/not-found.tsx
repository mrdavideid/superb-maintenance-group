import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-black-pure">
      <div className="text-center">
        <span className="font-display text-[10rem] lg:text-[14rem] font-bold leading-none text-white-pure/5">
          404
        </span>
        <h1 className="font-display text-3xl lg:text-4xl font-bold text-white-pure -mt-8">
          Page not found
        </h1>
        <p className="text-white-muted mt-4 mb-8">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          href="/"
          className="inline-flex items-center h-11 px-7 border border-gold/40 text-gold text-[0.7rem] font-normal tracking-[0.25em] uppercase hover:bg-gold hover:text-black-pure transition-all duration-400"
        >
          Back to Home
        </Link>
      </div>
    </section>
  )
}
