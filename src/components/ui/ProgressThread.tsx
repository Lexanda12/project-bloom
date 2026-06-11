'use client'

import type { JourneyStage } from '@/types'

const STAGE_ORDER: JourneyStage[] = [
  'REACHED', 'EXPECTED', 'REFERRED', 'BOOKED', 'ATTENDED'
]

interface ProgressThreadProps {
  currentStage: JourneyStage
}

export function ProgressThread({ currentStage }: ProgressThreadProps) {
  const currentIndex = STAGE_ORDER.indexOf(currentStage)
  const fillPercent = ((currentIndex + 1) / STAGE_ORDER.length) * 100

  return (
    <div className="fixed left-4 top-1/4 h-1/2 w-[3px] rounded-full bg-bloom-border z-10">
      <div
        className="rounded-full bg-bloom-gold transition-all duration-700 ease-in-out"
        style={{ height: `${fillPercent}%` }}
      />
    </div>
  )
}
