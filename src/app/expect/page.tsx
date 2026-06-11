'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { clsx } from 'clsx'
import { MobileShell } from '@/components/layout/MobileShell'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ProgressThread } from '@/components/ui/ProgressThread'
import { EXPECT_STEPS } from '@/content/expect-steps'
import {
  initJourney,
  advanceStage,
  updateJourneyState,
  checkReentry,
} from '@/lib/journey/tracker'

const ICONS: Record<string, string> = {
  phone: '📞',
  clipboard: '📋',
  user: '👩‍⚕️',
  heart: '❤️',
  'check-circle': '✅',
  star: '⭐',
}

export default function ExpectPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [allSeen, setAllSeen] = useState(false)

  useEffect(() => {
    initJourney()
    advanceStage('EXPECTED')

    const reentry = checkReentry()
    if (reentry.hasActiveJourney && reentry.stepIndex !== undefined) {
      setCurrentStep(reentry.stepIndex)
    }
  }, [])

  useEffect(() => {
    updateJourneyState({ expectStepIndex: currentStep })
    if (currentStep >= EXPECT_STEPS.length - 1) {
      setAllSeen(true)
    }
  }, [currentStep])

  function handleNext() {
    if (currentStep < EXPECT_STEPS.length - 1) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  function handleGoToFacilities() {
    router.push('/facilities')
  }

  const step = EXPECT_STEPS[currentStep]
  const isLast = currentStep === EXPECT_STEPS.length - 1

  return (
    <MobileShell>
      <ProgressThread currentStage="EXPECTED" />

      {/* Top nav */}
      <div className="pt-10 pb-6 flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="text-bloom-muted text-sm underline"
        >
          ← Back
        </button>
        <span className="text-bloom-muted text-sm ml-auto">
          {currentStep + 1} of {EXPECT_STEPS.length}
        </span>
      </div>

      {/* Page title */}
      <h1 className="font-display text-bloom-text text-[1.75rem] leading-tight mb-2">
        What to expect
      </h1>
      <p className="text-bloom-muted text-[17px] mb-8">
        Here is exactly what happens when you go for a breast screening.
        Nothing left out.
      </p>

      {/* Step card */}
      <Card className="mb-6">
        <div className="text-4xl mb-4">{ICONS[step.icon] ?? '•'}</div>
        <h2 className="font-display text-bloom-text text-[1.4rem] leading-snug mb-3">
          {step.title}
        </h2>
        <p className="text-bloom-text text-[17px] leading-relaxed">
          {step.body}
        </p>
      </Card>

      {/* Step progress dots and next action */}
      <div className="flex items-center justify-between mt-8">
        <div className="flex gap-1.5">
          {EXPECT_STEPS.map((_, idx) => (
            <div
              key={idx}
              className={clsx(
                'h-2.5 w-2.5 rounded-full transition-colors duration-300',
                idx === currentStep
                  ? 'bg-bloom-primary'
                  : idx < currentStep
                  ? 'bg-bloom-gold'
                  : 'bg-bloom-border'
              )}
            />
          ))}
        </div>

        {!isLast ? (
          <Button
            onClick={handleNext}
            variant="ghost"
            fullWidth={false}
            className="min-h-[44px] !no-underline"
          >
            Keep reading →
          </Button>
        ) : (
          <div className="h-11" />
        )}
      </div>

      {/* Primary CTA — only shown at the end */}
      {allSeen && (
        <div className="mt-10">
          <Button onClick={handleGoToFacilities} variant="primary">
            Find a clinic near you →
          </Button>
        </div>
      )}
    </MobileShell>
  )
}
