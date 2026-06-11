'use client'

import Link from 'next/link'
import { MobileShell } from '@/components/layout/MobileShell'
import { Button } from '@/components/ui/Button'
import { useEffect } from 'react'
import { initJourney, advanceStage } from '@/lib/journey/tracker'

export default function LandingPage() {
  useEffect(() => {
    const state = initJourney()
    advanceStage('REACHED')
  }, [])

  return (
    <MobileShell>
      {/* Top spacer */}
      <div className="pt-12" />

      {/* Logo / wordmark */}
      <div className="mb-10">
        <span className="font-display text-bloom-primary text-2xl tracking-tight">
          bloom
        </span>
      </div>

      {/* Hero */}
      <div className="mb-8">
        <h1 className="font-display text-bloom-text text-[2rem] leading-[1.2] mb-4">
          Going for a breast screening can feel scary.{' '}
          <span className="text-bloom-primary">That&apos;s normal.</span>
        </h1>
        <p className="text-bloom-muted text-[17px] leading-relaxed">
          We&apos;ll walk with you — from knowing what to expect, to finding a
          place near you to go.
        </p>
      </div>

      {/* Trust signal — companionable, not institutional */}
      <div className="mb-10 rounded-2xl bg-bloom-surface border border-bloom-border p-5">
        <p className="text-bloom-text text-[17px] leading-relaxed">
          &ldquo;I kept putting it off because I didn&apos;t know what would
          happen when I got there. Once I knew, I went.&rdquo;
        </p>
        <p className="mt-3 text-bloom-muted text-sm font-medium">
          — Amaka, Lagos
        </p>
      </div>

      {/* Journey thread visual — ambient progress marker */}
      <div className="mb-3 flex items-center gap-2">
        <div className="h-[3px] w-8 rounded-full bg-bloom-gold" />
        <span className="text-bloom-muted text-sm">3 steps. 5 minutes.</span>
      </div>

      {/* Three steps preview */}
      <div className="mb-10 space-y-3">
        {[
          { n: '1', label: 'See what to expect at a screening' },
          { n: '2', label: 'Find a clinic near you' },
          { n: '3', label: 'Get a referral you can bring with you' },
        ].map((step) => (
          <div key={step.n} className="flex items-start gap-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-bloom-primary text-white text-sm font-semibold">
              {step.n}
            </div>
            <p className="text-bloom-text text-[17px] leading-snug pt-1">
              {step.label}
            </p>
          </div>
        ))}
      </div>

      {/* Primary CTA — one action, nothing competing */}
      <Link href="/expect" className="block">
        <Button variant="primary" fullWidth>
          See what to expect →
        </Button>
      </Link>

      {/* Footer note */}
      <p className="mt-6 text-center text-bloom-muted text-sm leading-relaxed">
        No sign-up needed. Your information stays on your phone.
      </p>
    </MobileShell>
  )
}
