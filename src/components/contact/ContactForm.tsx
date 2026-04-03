'use client'

import { useState } from 'react'
import { services } from '@/data/services'

interface ContactFormProps {
  variant?: 'full' | 'compact'
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

export function ContactForm({ variant = 'full' }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  })
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setStatus('submitting')

    // Simulate submission (replace with real API endpoint)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setStatus('success')
      setFormData({ name: '', email: '', phone: '', service: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  const inputClasses = (field: string) =>
    `w-full bg-transparent border-b py-3 text-text text-sm font-body placeholder:text-text-muted/50 focus:outline-none transition-colors duration-300 ${
      errors[field] ? 'border-red-500' : 'border-text/10 focus:border-gold'
    }`

  if (status === 'success') {
    return (
      <div className="form-success text-center py-12">
        <p className="font-display text-xl font-bold text-gold mb-2">Message sent.</p>
        <p className="text-text-secondary text-sm">We will be in touch within 6 hours.</p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-6 text-[0.65rem] tracking-[0.35em] uppercase text-text-muted hover:text-gold transition-colors"
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto" noValidate>
      {status === 'error' && (
        <div className="form-error mb-8">
          Something went wrong. Please try again or call us on 0452 588 638.
        </div>
      )}

      <div className={`grid ${variant === 'compact' ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'} gap-6`}>
        <div>
          <input
            type="text"
            name="name"
            placeholder="Name"
            required
            value={formData.name}
            onChange={handleChange}
            className={inputClasses('name')}
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={handleChange}
            className={inputClasses('email')}
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>
        <input
          type="tel"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          className={inputClasses('phone')}
        />
        <select
          name="service"
          value={formData.service}
          onChange={handleChange}
          className={`${inputClasses('service')} cursor-pointer appearance-none`}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%238A857E' fill='none' stroke-width='1.5'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 0 center',
          }}
        >
          <option value="" className="bg-bg text-text-muted">Select a service</option>
          {services.map((s) => (
            <option key={s.slug} value={s.title} className="bg-bg text-text">
              {s.title}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-6">
        <textarea
          name="message"
          placeholder="Tell us about your project"
          required
          rows={4}
          value={formData.message}
          onChange={handleChange}
          className={`${inputClasses('message')} resize-none`}
        />
        {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
      </div>

      <div className="mt-10">
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="btn-primary btn-shimmer w-full sm:w-auto disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {status === 'submitting' ? 'Sending...' : 'Enquire'}
        </button>
      </div>
    </form>
  )
}
