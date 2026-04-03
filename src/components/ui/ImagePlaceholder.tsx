interface ImagePlaceholderProps {
  filename: string
  aspect?: string
  className?: string
}

export function ImagePlaceholder({
  filename,
  aspect = '4/3',
  className = '',
}: ImagePlaceholderProps) {
  return (
    <div
      className={`image-placeholder w-full ${className}`}
      style={{ aspectRatio: aspect }}
    >
      <span className="px-4 text-center">{filename}</span>
    </div>
  )
}
