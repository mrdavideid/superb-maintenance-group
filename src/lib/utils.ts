// Combine class names
export function cn(...inputs: (string | undefined | false | null)[]) {
  return inputs.filter(Boolean).join(' ')
}

// Format phone for tel: link
export function formatPhoneLink(phone: string): string {
  return `tel:+61${phone.replace(/\s/g, '').replace(/^0/, '')}`
}

// Format email for mailto: link
export function formatEmailLink(email: string): string {
  return `mailto:${email}`
}

// Slugify a string
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}
